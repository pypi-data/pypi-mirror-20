import os.path
import yaml
import jinja2
import re
from dbt.templates import BaseCreateTemplate, ArchiveInsertTemplate
from dbt.utils import split_path
import dbt.schema_tester
import dbt.project
import dbt.archival
from dbt.adapters.factory import get_adapter
from dbt.utils import deep_merge, DBTConfigKeys, compiler_error, \
    compiler_warning


class NodeType(object):
    Base = 'base'
    Model = 'model'
    Test = 'test'
    Archive = 'archive'
    Analysis = 'analysis'


class TestNodeType(object):
    SchemaTest = 'schema'
    DataTest = 'data'


class SourceConfig(object):
    Materializations = ['view', 'table', 'incremental', 'ephemeral']
    ConfigKeys = DBTConfigKeys

    AppendListFields = ['pre-hook', 'post-hook']
    ExtendDictFields = ['vars']
    ClobberFields = [
        'enabled',
        'materialized',
        'dist',
        'sort',
        'sql_where',
        'unique_key',
        'sort_type'
    ]

    def __init__(self, active_project, own_project, fqn):
        self.active_project = active_project
        self.own_project = own_project
        self.fqn = fqn

        # the config options defined within the model
        self.in_model_config = {}

        # make sure we categorize all configs
        all_configs = self.AppendListFields + self.ExtendDictFields + \
            self.ClobberFields

        for config in self.ConfigKeys:
            assert config in all_configs, config

    def _merge(self, *configs):
        merged_config = {}
        for config in configs:
            intermediary_merged = deep_merge(
                merged_config.copy(), config.copy()
            )

            merged_config.update(intermediary_merged)
        return merged_config

    # this is re-evaluated every time `config` is called.
    # we can cache it, but that complicates things.
    # TODO : see how this fares performance-wise
    @property
    def config(self):
        """
        Config resolution order:

         if this is a dependency model:
           - own project config
           - in-model config
           - active project config
         if this is a top-level model:
           - active project config
           - in-model config
        """
        defaults = {"enabled": True, "materialized": "view"}
        active_config = self.load_config_from_active_project()

        if self.active_project['name'] == self.own_project['name']:
            cfg = self._merge(defaults, active_config, self.in_model_config)
        else:
            own_config = self.load_config_from_own_project()
            cfg = self._merge(
                defaults, own_config, self.in_model_config, active_config
            )

        # mask this as a table if it's an incremental model with
        # --full-refresh provided
        if cfg.get('materialized') == 'incremental' and self.is_full_refresh():
            cfg['materialized'] = 'table'

        return cfg

    def is_full_refresh(self):
        if hasattr(self.active_project.args, 'full_refresh'):
            return self.active_project.args.full_refresh
        else:
            return False

    def update_in_model_config(self, config):
        config = config.copy()

        # make sure we're not clobbering an array of hooks with a single hook
        # string
        hook_fields = ['pre-hook', 'post-hook']
        for hook_field in hook_fields:
            if hook_field in config:
                config[hook_field] = self.__get_hooks(config, hook_field)

        self.in_model_config.update(config)

    def __get_hooks(self, relevant_configs, key):
        hooks = []

        if key not in relevant_configs:
            return []

        new_hooks = relevant_configs[key]
        if type(new_hooks) not in [list, tuple]:
            new_hooks = [new_hooks]

        for hook in new_hooks:
            if type(hook) != str:
                name = ".".join(self.fqn)
                compiler_error(None, "{} for model {} is not a string!".format(
                    key, name
                ))

            hooks.append(hook)
        return hooks

    def smart_update(self, mutable_config, new_configs):
        relevant_configs = {
            key: new_configs[key] for key
            in new_configs if key in self.ConfigKeys
        }

        for key in SourceConfig.AppendListFields:
            new_hooks = self.__get_hooks(relevant_configs, key)
            mutable_config[key].extend([
                h for h in new_hooks if h not in mutable_config[key]
            ])

        for key in SourceConfig.ExtendDictFields:
            dict_val = relevant_configs.get(key, {})
            mutable_config[key].update(dict_val)

        for key in SourceConfig.ClobberFields:
            if key in relevant_configs:
                mutable_config[key] = relevant_configs[key]

        return relevant_configs

    def get_project_config(self, project):
        # most configs are overwritten by a more specific config, but pre/post
        # hooks are appended!
        config = {}
        for k in SourceConfig.AppendListFields:
            config[k] = []
        for k in SourceConfig.ExtendDictFields:
            config[k] = {}

        model_configs = project['models']

        if model_configs is None:
            return config

        # mutates config
        self.smart_update(config, model_configs)

        fqn = self.fqn[:]
        for level in fqn:
            level_config = model_configs.get(level, None)
            if level_config is None:
                break

            # mutates config
            relevant_configs = self.smart_update(config, level_config)

            clobber_configs = {
                k: v for (k, v) in relevant_configs.items()
                if k not in SourceConfig.AppendListFields and
                k not in SourceConfig.ExtendDictFields
            }

            config.update(clobber_configs)
            model_configs = model_configs[level]

        return config

    def load_config_from_own_project(self):
        return self.get_project_config(self.own_project)

    def load_config_from_active_project(self):
        return self.get_project_config(self.active_project)


class DBTSource(object):
    dbt_run_type = NodeType.Base

    def __init__(self, project, top_dir, rel_filepath, own_project):
        self.project = project
        self.own_project = own_project

        self.top_dir = top_dir
        self.rel_filepath = rel_filepath
        self.filepath = os.path.join(top_dir, rel_filepath)
        self.filedir = os.path.dirname(self.filepath)
        self.name = self.fqn[-1]
        self.own_project_name = self.fqn[0]

        self.source_config = SourceConfig(project, own_project, self.fqn)

    @property
    def absolute_path(self):
        return os.path.join(self.root_dir, self.rel_filepath)

    @property
    def root_dir(self):
        return os.path.join(self.own_project['project-root'], self.top_dir)

    @property
    def is_empty(self):
        return len(self.contents.strip()) == 0

    def compile(self):
        raise RuntimeError("Not implemented!")

    def serialize(self):
        serialized = {
            "build_path": os.path.join(
                self.project['target-path'], self.build_path()
            ),
            "source_path": self.filepath,
            "name": self.name,
            "tmp_name": self.tmp_name(),
            "project_name": self.own_project['name'],
            "dbt_run_type": self.dbt_run_type
        }

        serialized.update(self.config)
        return serialized

    @property
    def contents(self):
        return dbt.clients.system.load_file_contents(self.absolute_path)

    @property
    def config(self):
        return self.source_config.config

    def update_in_model_config(self, config):
        self.source_config.update_in_model_config(config)

    @property
    def materialization(self):
        return self.config['materialized']

    @property
    def is_incremental(self):
        return self.materialization == 'incremental'

    @property
    def is_ephemeral(self):
        return self.materialization == 'ephemeral'

    @property
    def is_table(self):
        return self.materialization == 'table'

    @property
    def is_view(self):
        return self.materialization == 'view'

    @property
    def is_enabled(self):
        enabled = self.config['enabled']
        if enabled not in (True, False):
            compiler_error(
                self,
                "'enabled' config must be either True or False. '{}' given."
                .format(enabled)
            )
        return enabled

    @property
    def fqn(self):
        """
        fully-qualified name for model. Includes all subdirs below 'models'
        path and the filename
        """
        parts = split_path(self.filepath)
        name, _ = os.path.splitext(parts[-1])
        return [self.own_project['name']] + parts[1:-1] + [name]

    @property
    def original_fqn(self):
        return self.fqn

    def tmp_name(self):
        if self.is_non_destructive():
            return self.name
        else:
            return "{}__dbt_tmp".format(self.name)

    def is_non_destructive(self):
        if hasattr(self.project.args, 'non_destructive'):
            return self.project.args.non_destructive
        else:
            return False

    def rename_query(self, schema):
        opts = {
            "schema": schema,
            "tmp_name": self.tmp_name(),
            "final_name": self.name
        }

        return 'alter table "{schema}"."{tmp_name}" rename to "{final_name}"' \
            .format(**opts)

    @property
    def nice_name(self):
        return "{}.{}".format(self.fqn[0], self.fqn[-1])


class Model(DBTSource):
    dbt_run_type = NodeType.Model
    build_dir = 'build'
    template = BaseCreateTemplate()

    def __init__(self, project, model_dir, rel_filepath, own_project):
        self.prologue = []
        super(Model, self).__init__(
            project, model_dir, rel_filepath, own_project
        )

    def add_to_prologue(self, s):
        safe_string = s.replace('{{', 'DBT_EXPR(').replace('}}', ')')
        self.prologue.append(safe_string)

    def get_prologue_string(self):
        blob = "\n".join("-- {}".format(s) for s in self.prologue)
        return "-- Compiled by DBT\n{}".format(blob)

    def sort_qualifier(self, model_config):
        if 'sort' not in model_config:
            return ''

        if (self.is_view or self.is_ephemeral) and 'sort' in model_config:
            return ''

        sort_keys = model_config['sort']
        sort_type = model_config.get('sort_type', 'compound')

        if type(sort_type) != str:
            compiler_error(
                self,
                "The provided sort_type '{}' is not valid!".format(sort_type)
            )

        sort_type = sort_type.strip().lower()

        adapter = get_adapter(self.project.run_environment())
        return adapter.sort_qualifier(sort_type, sort_keys)

    def dist_qualifier(self, model_config):
        if 'dist' not in model_config:
            return ''

        if (self.is_view or self.is_ephemeral) and 'dist' in model_config:
            return ''

        dist_key = model_config['dist']

        if type(dist_key) != str:
            compiler_error(
                self,
                "The provided distkey '{}' is not valid!".format(dist_key)
            )

        dist_key = dist_key.strip().lower()

        adapter = get_adapter(self.project.run_environment())
        return adapter.dist_qualifier(dist_key)

    def build_path(self):
        filename = "{}.sql".format(self.name)
        path_parts = [self.build_dir] + self.fqn[:-1] + [filename]
        return os.path.join(*path_parts)

    def compile_string(self, ctx, string):
        # python 2+3 check for stringiness
        try:
            basestring
        except NameError:
            basestring = str

        # if bool/int/float/etc are passed in, don't compile anything
        if not isinstance(string, basestring):
            return string

        try:
            fs_loader = jinja2.FileSystemLoader(
                searchpath=self.project['macro-paths']
            )
            env = jinja2.Environment(loader=fs_loader)
            template = env.from_string(string, globals=ctx)
            return template.render(ctx)
        except jinja2.exceptions.TemplateSyntaxError as e:
            compiler_error(self, str(e))
        except jinja2.exceptions.UndefinedError as e:
            compiler_error(self, str(e))

    def get_hooks(self, ctx, hook_key):
        hooks = self.config.get(hook_key, [])
        if type(hooks) == str:
            hooks = [hooks]

        return [self.compile_string(ctx, hook) for hook in hooks]

    def compile(self, rendered_query, project, ctx):
        model_config = self.config

        if self.materialization not in SourceConfig.Materializations:
            compiler_error(
                self,
                "Invalid materialize option given: '{}'. Must be one of {}"
                .format(self.materialization, SourceConfig.Materializations)
            )

        schema = ctx['env'].get('schema', 'public')

        # these are empty strings if configs aren't provided
        dist_qualifier = self.dist_qualifier(model_config)
        sort_qualifier = self.sort_qualifier(model_config)

        if self.materialization == 'incremental':
            identifier = self.name
            if 'sql_where' not in model_config:
                compiler_error(
                    self,
                    """sql_where not specified in model materialized as
                    incremental"""
                )
            raw_sql_where = model_config['sql_where']
            sql_where = self.compile_string(ctx, raw_sql_where)

            unique_key = model_config.get('unique_key', None)
        else:
            identifier = self.tmp_name()
            sql_where = None
            unique_key = None

        pre_hooks = self.get_hooks(ctx, 'pre-hook')
        post_hooks = self.get_hooks(ctx, 'post-hook')

        opts = {
            "materialization": self.materialization,
            "schema": schema,
            "identifier": identifier,
            "query": rendered_query,
            "dist_qualifier": dist_qualifier,
            "sort_qualifier": sort_qualifier,
            "sql_where": sql_where,
            "prologue": self.get_prologue_string(),
            "unique_key": unique_key,
            "pre-hooks": pre_hooks,
            "post-hooks": post_hooks,
            "non_destructive": self.is_non_destructive()
        }

        return self.template.wrap(opts)

    @property
    def immediate_name(self):
        if self.materialization == 'incremental':
            return self.name
        else:
            return self.tmp_name()

    @property
    def cte_name(self):
        return "__dbt__CTE__{}".format(self.name)

    def __repr__(self):
        return "<Model {}.{}: {}>".format(
            self.project['name'], self.name, self.filepath
        )


class Analysis(Model):
    dbt_run_type = NodeType.Analysis

    def __init__(self, project, target_dir, rel_filepath, own_project):
        return super(Analysis, self).__init__(
            project,
            target_dir,
            rel_filepath,
            own_project
        )

    def build_path(self):
        build_dir = 'build-analysis'
        filename = "{}.sql".format(self.name)
        path_parts = [build_dir] + self.fqn[:-1] + [filename]
        return os.path.join(*path_parts)

    def __repr__(self):
        return "<Analysis {}: {}>".format(self.name, self.filepath)


class SchemaTest(DBTSource):
    test_type = "base"
    dbt_run_type = NodeType.Test
    dbt_test_type = TestNodeType.SchemaTest

    def __init__(self, project, target_dir, rel_filepath, model_name, options):
        self.schema = project.context()['env']['schema']
        self.model_name = model_name
        self.options = options
        self.params = self.get_params(options)

        super(SchemaTest, self).__init__(
            project, target_dir, rel_filepath, project
        )

    @property
    def fqn(self):
        parts = split_path(self.filepath)
        name, _ = os.path.splitext(parts[-1])
        return [self.project['name']] + parts[1:-1] + \
            ['schema', self.get_filename()]

    def serialize(self):
        serialized = DBTSource.serialize(self).copy()
        serialized['dbt_test_type'] = self.dbt_test_type

        return serialized

    def get_params(self, options):
        return {
            "schema": self.schema,
            "table": self.model_name,
            "field": options
        }

    def unique_option_key(self):
        return self.params

    def get_filename(self):
        key = re.sub('[^0-9a-zA-Z]+', '_', self.unique_option_key())
        filename = "{test_type}_{model_name}_{key}".format(
            test_type=self.test_type, model_name=self.model_name, key=key
        )
        return filename

    def build_path(self):
        build_dir = "test"
        filename = "{}.sql".format(self.get_filename())
        path_parts = [build_dir] + self.fqn[:-1] + [filename]
        return os.path.join(*path_parts)

    @property
    def template(self):
        raise NotImplementedError("not implemented")

    def render(self):
        return self.template.format(**self.params)

    def __repr__(self):
        class_name = self.__class__.__name__
        return "<{} {}.{}: {}>".format(
            class_name, self.project['name'], self.name, self.filepath
        )


class NotNullSchemaTest(SchemaTest):
    template = dbt.schema_tester.QUERY_VALIDATE_NOT_NULL
    test_type = "not_null"

    def unique_option_key(self):
        return self.params['field']

    def describe(self):
        return 'VALIDATE NOT NULL {schema}.{table}.{field}' \
            .format(**self.params)


class UniqueSchemaTest(SchemaTest):
    template = dbt.schema_tester.QUERY_VALIDATE_UNIQUE
    test_type = "unique"

    def unique_option_key(self):
        return self.params['field']

    def describe(self):
        return 'VALIDATE UNIQUE {schema}.{table}.{field}'.format(**self.params)


class ReferentialIntegritySchemaTest(SchemaTest):
    template = dbt.schema_tester.QUERY_VALIDATE_REFERENTIAL_INTEGRITY
    test_type = "relationships"

    def get_params(self, options):
        return {
            "schema": self.schema,
            "child_table": self.model_name,
            "child_field": options['from'],
            "parent_table": options['to'],
            "parent_field": options['field']
        }

    def unique_option_key(self):
        return "{child_field}_to_{parent_table}_{parent_field}" \
            .format(**self.params)

    def describe(self):
        return """VALIDATE REFERENTIAL INTEGRITY
        {schema}.{child_table}.{child_field} to
        {schema}.{parent_table}.{parent_field}""".format(**self.params)


class AcceptedValuesSchemaTest(SchemaTest):
    template = dbt.schema_tester.QUERY_VALIDATE_ACCEPTED_VALUES
    test_type = "accepted_values"

    def get_params(self, options):
        quoted_values = ["'{}'".format(v) for v in options['values']]
        quoted_values_csv = ",".join(quoted_values)
        return {
            "schema": self.schema,
            "table": self.model_name,
            "field": options['field'],
            "values_csv": quoted_values_csv
        }

    def unique_option_key(self):
        return "{field}".format(**self.params)

    def describe(self):
        return """VALIDATE ACCEPTED VALUES
        {schema}.{table}.{field} VALUES
        ({values_csv})""".format(**self.params)


class SchemaFile(DBTSource):
    SchemaTestMap = {
        'not_null': NotNullSchemaTest,
        'unique': UniqueSchemaTest,
        'relationships': ReferentialIntegritySchemaTest,
        'accepted_values': AcceptedValuesSchemaTest
    }

    def __init__(self, project, target_dir, rel_filepath, own_project):
        super(SchemaFile, self).__init__(
            project, target_dir, rel_filepath, own_project
        )
        self.og_target_dir = target_dir
        self.schema = yaml.safe_load(self.contents)

    def get_test(self, test_type):
        if test_type in SchemaFile.SchemaTestMap:
            return SchemaFile.SchemaTestMap[test_type]
        else:
            possible_types = ", ".join(SchemaFile.SchemaTestMap.keys())
            compiler_error(
                self,
                "Invalid validation type given in {}: '{}'. Possible: {}"
                .format(self.filepath, test_type, possible_types)
            )

    def do_compile(self):
        schema_tests = []
        for model_name, constraint_blob in self.schema.items():
            constraints = constraint_blob.get('constraints', {})
            for constraint_type, constraint_data in constraints.items():
                if constraint_data is None:
                    compiler_error(
                        self,
                        "no constraints given to test: '{}.{}'"
                        .format(model_name, constraint_type)
                    )
                for params in constraint_data:
                    schema_test_klass = self.get_test(constraint_type)
                    schema_test = schema_test_klass(
                        self.project,
                        self.og_target_dir,
                        self.rel_filepath,
                        model_name,
                        params
                    )
                    schema_tests.append(schema_test)
        return schema_tests

    def compile(self):
        try:
            return self.do_compile()
        except TypeError as e:
            compiler_error(self, str(e))
        except AttributeError as e:
            compiler_error(self, str(e))

    def __repr__(self):
        return "<SchemaFile {}.{}: {}>".format(
            self.project['name'], self.model_name, self.filepath
        )


class Csv(DBTSource):
    def __init__(self, project, target_dir, rel_filepath, own_project):
        super(Csv, self).__init__(
            project, target_dir, rel_filepath, own_project
        )

    def __repr__(self):
        return "<Csv {}.{}: {}>".format(
            self.project['name'], self.model_name, self.filepath
        )


class Macro(DBTSource):
    def __init__(self, project, target_dir, rel_filepath, own_project):
        super(Macro, self).__init__(
            project, target_dir, rel_filepath, own_project
        )
        self.filepath = os.path.join(self.root_dir, self.rel_filepath)

    def get_macros(self, ctx):
        env = jinja2.Environment()
        try:
            template = env.from_string(self.contents, globals=ctx)
        except jinja2.exceptions.TemplateSyntaxError as e:
            compiler_error(self, str(e))

        for key, item in template.module.__dict__.items():
            if type(item) == jinja2.runtime.Macro:
                yield {"project": self.own_project, "name": key, "macro": item}

    def __repr__(self):
        return "<Macro {}.{}: {}>".format(
            self.project['name'], self.name, self.filepath
        )


class ArchiveModel(DBTSource):
    dbt_run_type = NodeType.Archive
    build_dir = 'archive'
    template = ArchiveInsertTemplate()

    def __init__(self, project, archive_data):

        self.validate(archive_data)

        self.source_schema = archive_data['source_schema']
        self.target_schema = archive_data['target_schema']
        self.source_table = archive_data['source_table']
        self.target_table = archive_data['target_table']
        self.unique_key = archive_data['unique_key']
        self.updated_at = archive_data['updated_at']

        rel_filepath = os.path.join(self.target_schema, self.target_table)

        super(ArchiveModel, self).__init__(
            project, self.build_dir, rel_filepath, project
        )

    def validate(self, data):
        required = [
            'source_schema',
            'target_schema',
            'source_table',
            'target_table',
            'unique_key',
            'updated_at',
        ]

        for key in required:
            if data.get(key, None) is None:
                compiler_error(
                    "Invalid archive config: missing required field '{}'"
                    .format(key)
                )

    def serialize(self):
        data = DBTSource.serialize(self).copy()

        serialized = {
            "source_schema": self.source_schema,
            "target_schema": self.target_schema,
            "source_table": self.source_table,
            "target_table": self.target_table,
            "unique_key": self.unique_key,
            "updated_at": self.updated_at
        }

        data.update(serialized)
        return data

    def compile(self):
        archival = dbt.archival.Archival(self.project, self)
        query = archival.compile()

        sql = self.template.wrap(
            self.target_schema, self.target_table, query, self.unique_key
        )

        return sql

    def build_path(self):
        filename = "{}.sql".format(self.name)
        path_parts = [self.build_dir] + self.fqn[:-1] + [filename]
        return os.path.join(*path_parts)

    def __repr__(self):
        return "<ArchiveModel {} --> {} unique:{} updated_at:{}>".format(
            self.source_table,
            self.target_table,
            self.unique_key,
            self.updated_at
        )


class DataTest(DBTSource):
    dbt_run_type = NodeType.Test
    dbt_test_type = TestNodeType.DataTest

    def __init__(self, project, target_dir, rel_filepath, own_project):
        super(DataTest, self).__init__(
            project,
            target_dir,
            rel_filepath,
            own_project
        )

    def build_path(self):
        build_dir = "test"
        filename = "{}.sql".format(self.name)
        fqn_parts = self.fqn[0:1] + ['data'] + self.fqn[1:-1]
        path_parts = [build_dir] + fqn_parts + [filename]
        return os.path.join(*path_parts)

    def serialize(self):
        serialized = DBTSource.serialize(self).copy()
        serialized['dbt_test_type'] = self.dbt_test_type

        return serialized

    def render(self, query):
        return "select count(*) from (\n{}\n) sbq".format(query)

    @property
    def immediate_name(self):
        return self.name

    def __repr__(self):
        return "<DataTest {}.{}: {}>".format(
            self.project['name'], self.name, self.filepath
        )
