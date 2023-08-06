import os
import fnmatch
import jinja2
from collections import defaultdict
import time
import sqlparse

import dbt.project
import dbt.utils

from dbt.source import Source
from dbt.utils import find_model_by_fqn, find_model_by_name, \
     split_path, This, Var, compiler_error, to_string

from dbt.linker import Linker
from dbt.runtime import RuntimeContext
import dbt.templates

from dbt.adapters.factory import get_adapter
from dbt.logger import GLOBAL_LOGGER as logger

CompilableEntities = [
    "models", "data tests", "schema tests", "archives", "analyses"
]

graph_file_name = 'graph.yml'


def compile_string(string, ctx):
    try:
        env = jinja2.Environment()
        template = env.from_string(str(string), globals=ctx)
        return template.render(ctx)
    except jinja2.exceptions.TemplateSyntaxError as e:
        compiler_error(None, str(e))
    except jinja2.exceptions.UndefinedError as e:
        compiler_error(None, str(e))


class Compiler(object):
    def __init__(self, project, args):
        self.project = project
        self.args = args

        self.macro_generator = None

    def initialize(self):
        if not os.path.exists(self.project['target-path']):
            os.makedirs(self.project['target-path'])

        if not os.path.exists(self.project['modules-path']):
            os.makedirs(self.project['modules-path'])

    def model_sources(self, this_project, own_project=None):
        if own_project is None:
            own_project = this_project

        paths = own_project.get('source-paths', [])
        return Source(
            this_project,
            own_project=own_project
        ).get_models(paths)

    def get_macros(self, this_project, own_project=None):
        if own_project is None:
            own_project = this_project
        paths = own_project.get('macro-paths', [])
        return Source(this_project, own_project=own_project).get_macros(paths)

    def get_archives(self, project):
        return Source(
            project,
            own_project=project
        ).get_archives()

    def project_schemas(self, project):
        source_paths = project.get('source-paths', [])
        return Source(project).get_schemas(source_paths)

    def project_tests(self, project):
        source_paths = project.get('test-paths', [])
        return Source(project).get_tests(source_paths)

    def analysis_sources(self, project):
        paths = project.get('analysis-paths', [])
        return Source(project).get_analyses(paths)

    def validate_models_unique(self, models, error_type):
        found_models = defaultdict(list)
        for model in models:
            found_models[model.name].append(model)
        for model_name, model_list in found_models.items():
            if len(model_list) > 1:
                models_str = "\n  - ".join(
                    [str(model) for model in model_list])

                error_msg = "Found {} models with the same name.\n" \
                            "  Name='{}'\n" \
                            "  - {}".format(
                                    len(model_list), model_name, models_str
                            )

                error_type(model_list[0], error_msg)

    def __write(self, build_filepath, payload):
        target_path = os.path.join(self.project['target-path'], build_filepath)

        if not os.path.exists(os.path.dirname(target_path)):
            os.makedirs(os.path.dirname(target_path))

        with open(target_path, 'w') as f:
            f.write(to_string(payload))

    def __model_config(self, model, linker):
        def do_config(*args, **kwargs):
            if len(args) == 1 and len(kwargs) == 0:
                opts = args[0]
            elif len(args) == 0 and len(kwargs) > 0:
                opts = kwargs
            else:
                raise RuntimeError(
                    "Invalid model config given inline in {}".format(model)
                )

            if type(opts) != dict:
                raise RuntimeError(
                    "Invalid model config given inline in {}".format(model)
                )

            model.update_in_model_config(opts)
            model.add_to_prologue("Config specified in model: {}".format(opts))
            return ""
        return do_config

    def model_can_reference(self, src_model, other_model):
        """
        returns True if the src_model can reference the other_model. Models
        can access other models in their package and dependency models, but
        a dependency model cannot access models "up" the dependency chain.
        """

        # hack for now b/c we don't support recursive dependencies
        return (
            other_model.own_project['name'] == src_model.own_project['name'] or
            src_model.own_project['name'] == src_model.project['name']
        )

    def __ref(self, linker, ctx, model, all_models):
        schema = ctx['env']['schema']

        source_model = tuple(model.fqn)
        linker.add_node(source_model)

        def do_ref(*args):
            if len(args) == 1:
                other_model_name = args[0]
                other_model = find_model_by_name(all_models, other_model_name)
            elif len(args) == 2:
                other_model_package, other_model_name = args

                other_model = find_model_by_name(
                    all_models,
                    other_model_name,
                    package_namespace=other_model_package
                )
            else:
                compiler_error(
                    model,
                    "ref() takes at most two arguments ({} given)".format(
                        len(args)
                    )
                )

            other_model_fqn = tuple(other_model.fqn[:-1] + [other_model_name])
            src_fqn = ".".join(source_model)
            ref_fqn = ".".join(other_model_fqn)

            if not other_model.is_enabled:
                raise RuntimeError(
                    "Model '{}' depends on model '{}' which is disabled in "
                    "the project config".format(src_fqn, ref_fqn)
                )

            # this creates a trivial cycle -- should this be a compiler error?
            # we can still interpolate the name w/o making a self-cycle
            if source_model == other_model_fqn:
                pass
            else:
                linker.dependency(source_model, other_model_fqn)

            if other_model.is_ephemeral:
                linker.inject_cte(model, other_model)
                return other_model.cte_name
            else:
                return '"{}"."{}"'.format(schema, other_model_name)

        def wrapped_do_ref(*args):
            try:
                return do_ref(*args)
            except RuntimeError as e:
                root = os.path.relpath(
                    model.root_dir,
                    model.project['project-root']
                )

                filepath = os.path.join(root, model.rel_filepath)
                logger.info("Compiler error in {}".format(filepath))
                logger.info("Enabled models:")
                for m in all_models:
                    logger.info(" - {}".format(".".join(m.fqn)))
                raise e

        return wrapped_do_ref

    def get_context(self, linker, model, models):
        runtime = RuntimeContext(model=model)

        context = self.project.context()

        # built-ins
        context['ref'] = self.__ref(linker, context, model, models)
        context['config'] = self.__model_config(model, linker)
        context['this'] = This(
            context['env']['schema'], model.immediate_name, model.name
        )
        context['var'] = Var(model, context=context)
        context['target'] = self.project.get_target()

        # these get re-interpolated at runtime!
        context['run_started_at'] = '{{ run_started_at }}'
        context['invocation_id'] = '{{ invocation_id }}'

        adapter = get_adapter(self.project.run_environment())
        context['sql_now'] = adapter.date_function

        runtime.update_global(context)

        # add in macros (can we cache these somehow?)
        for macro_data in self.macro_generator(context):
            macro = macro_data["macro"]
            macro_name = macro_data["name"]
            project = macro_data["project"]

            runtime.update_package(project['name'], {macro_name: macro})

            if project['name'] == self.project['name']:
                runtime.update_global({macro_name: macro})

        return runtime

    def compile_model(self, linker, model, models):
        try:
            fs_loader = jinja2.FileSystemLoader(searchpath=model.root_dir)
            jinja = jinja2.Environment(loader=fs_loader)

            template_contents = dbt.clients.system.load_file_contents(
                model.absolute_path)

            template = jinja.from_string(template_contents)
            context = self.get_context(linker, model, models)

            rendered = template.render(context)
        except jinja2.exceptions.TemplateSyntaxError as e:
            compiler_error(model, str(e))
        except jinja2.exceptions.UndefinedError as e:
            compiler_error(model, str(e))

        return rendered

    def write_graph_file(self, linker):
        filename = graph_file_name
        graph_path = os.path.join(self.project['target-path'], filename)
        linker.write_graph(graph_path)

    def combine_query_with_ctes(self, model, query, ctes, compiled_models):
        parsed_stmts = sqlparse.parse(query)
        if len(parsed_stmts) != 1:
            raise RuntimeError(
                "unexpectedly parsed {} queries from model "
                "{}".format(len(parsed_stmts), model)
            )

        parsed = parsed_stmts[0]

        with_stmt = None
        for token in parsed.tokens:
            if token.is_keyword and token.normalized == 'WITH':
                with_stmt = token
                break

        if with_stmt is None:
            # no with stmt, add one!
            first_token = parsed.token_first()
            with_stmt = sqlparse.sql.Token(sqlparse.tokens.Keyword, 'with')
            parsed.insert_before(first_token, with_stmt)
        else:
            # stmt exists, add a comma (which will come after our injected
            # CTE(s) )
            trailing_comma = sqlparse.sql.Token(
                sqlparse.tokens.Punctuation, ','
            )
            parsed.insert_after(with_stmt, trailing_comma)

        cte_mapping = [
            (model.cte_name, compiled_models[model]) for model in ctes
        ]

        # these newlines are important -- comments could otherwise interfere
        # w/ query
        cte_stmts = [
            " {} as (\n{}\n)".format(name, contents)
            for (name, contents) in cte_mapping
        ]

        cte_text = sqlparse.sql.Token(
            sqlparse.tokens.Keyword, ", ".join(cte_stmts)
        )
        parsed.insert_after(with_stmt, cte_text)

        return str(parsed)

    def __recursive_add_ctes(self, linker, model):
        if model not in linker.cte_map:
            return set()

        models_to_add = linker.cte_map[model]
        recursive_models = [
            self.__recursive_add_ctes(linker, m) for m in models_to_add
        ]

        for recursive_model_set in recursive_models:
            models_to_add = models_to_add | recursive_model_set

        return models_to_add

    def add_cte_to_rendered_query(
            self, linker, primary_model, compiled_models
    ):
        fqn_to_model = {tuple(model.fqn): model for model in compiled_models}
        sorted_nodes = linker.as_topological_ordering()

        models_to_add = self.__recursive_add_ctes(linker, primary_model)

        required_ctes = []
        for node in sorted_nodes:

            if node not in fqn_to_model:
                continue

            model = fqn_to_model[node]
            # add these in topological sort order -- significant for CTEs
            if model.is_ephemeral and model in models_to_add:
                required_ctes.append(model)

        query = compiled_models[primary_model]
        if len(required_ctes) == 0:
            return query
        else:
            compiled_query = self.combine_query_with_ctes(
                primary_model, query, required_ctes, compiled_models
            )
            return compiled_query

    def remove_node_from_graph(self, linker, model, models):
        # remove the node
        children = linker.remove_node(tuple(model.fqn))

        # check if we bricked the graph. if so: throw compilation error
        for child in children:
            other_model = find_model_by_fqn(models, child)

            if other_model.is_enabled:
                this_fqn = ".".join(model.fqn)
                that_fqn = ".".join(other_model.fqn)
                compiler_error(
                    model,
                    "Model '{}' depends on model '{}' which is "
                    "disabled".format(that_fqn, this_fqn)
                )

    def compile_models(self, linker, models):
        compiled_models = {model: self.compile_model(linker, model, models)
                           for model in models}
        sorted_models = [find_model_by_fqn(models, fqn)
                         for fqn in linker.as_topological_ordering()]

        written_models = []
        for model in sorted_models:
            # in-model configs were just evaluated. Evict anything that is
            # newly-disabled
            if not model.is_enabled:
                self.remove_node_from_graph(linker, model, models)
                continue

            injected_stmt = self.add_cte_to_rendered_query(
                linker, model, compiled_models
            )

            context = self.get_context(linker, model, models)
            wrapped_stmt = model.compile(injected_stmt, self.project, context)

            serialized = model.serialize()
            linker.update_node_data(tuple(model.fqn), serialized)

            if model.is_ephemeral:
                continue

            self.__write(model.build_path(), wrapped_stmt)
            written_models.append(model)

        return compiled_models, written_models

    def compile_analyses(self, linker, compiled_models):
        analyses = self.analysis_sources(self.project)
        compiled_analyses = {
            analysis: self.compile_model(
                linker, analysis, compiled_models
            ) for analysis in analyses
        }

        written_analyses = []
        referenceable_models = {}
        referenceable_models.update(compiled_models)
        referenceable_models.update(compiled_analyses)
        for analysis in analyses:
            injected_stmt = self.add_cte_to_rendered_query(
                linker,
                analysis,
                referenceable_models
            )

            serialized = analysis.serialize()
            linker.update_node_data(tuple(analysis.fqn), serialized)

            build_path = analysis.build_path()
            self.__write(build_path, injected_stmt)
            written_analyses.append(analysis)

        return written_analyses

    def get_local_and_package_sources(self, project, source_getter):
        all_sources = []

        all_sources.extend(source_getter(project))

        for package in dbt.utils.dependency_projects(project):
            all_sources.extend(source_getter(package))

        return all_sources

    def compile_schema_tests(self, linker, models):
        all_schema_specs = self.get_local_and_package_sources(
                self.project,
                self.project_schemas
        )

        schema_tests = []

        for schema in all_schema_specs:
            # compiling a SchemaFile returns >= 0 SchemaTest models
            try:
                schema_tests.extend(schema.compile())
            except RuntimeError as e:
                logger.info("\n" + str(e))
                schema_test_path = schema.filepath
                logger.info("Skipping compilation for {}...\n"
                            .format(schema_test_path))

        written_tests = []
        for schema_test in schema_tests:
            # show a warning if the model being tested doesn't exist
            try:
                source_model = find_model_by_name(models,
                                                  schema_test.model_name)
            except RuntimeError as e:
                dbt.utils.compiler_warning(schema_test, str(e))
                continue

            if not source_model.is_enabled:
                continue

            serialized = schema_test.serialize()

            model_node = tuple(source_model.fqn)
            test_node = tuple(schema_test.fqn)

            linker.dependency(test_node, model_node)
            linker.update_node_data(test_node, serialized)

            query = schema_test.render()
            self.__write(schema_test.build_path(), query)
            written_tests.append(schema_test)

        return written_tests

    def compile_data_tests(self, linker, models):
        tests = self.get_local_and_package_sources(
                self.project,
                self.project_tests
        )

        written_tests = []
        for data_test in tests:
            serialized = data_test.serialize()
            linker.update_node_data(tuple(data_test.fqn), serialized)
            query = self.compile_model(linker, data_test, models)
            wrapped = data_test.render(query)
            self.__write(data_test.build_path(), wrapped)
            written_tests.append(data_test)

        return written_tests

    def generate_macros(self, all_macros):
        def do_gen(ctx):
            macros = []
            for macro in all_macros:
                new_macros = macro.get_macros(ctx)
                macros.extend(new_macros)
            return macros
        return do_gen

    def compile_archives(self, linker, compiled_models):
        all_archives = self.get_archives(self.project)

        for archive in all_archives:
            sql = archive.compile()
            fqn = tuple(archive.fqn)
            linker.update_node_data(fqn, archive.serialize())
            self.__write(archive.build_path(), sql)

        return all_archives

    def get_models(self):
        all_models = self.model_sources(this_project=self.project)
        for project in dbt.utils.dependency_projects(self.project):
            all_models.extend(
                self.model_sources(
                    this_project=self.project, own_project=project
                )
            )

        return all_models

    def compile(self):
        linker = Linker()

        all_models = self.get_models()
        all_macros = self.get_macros(this_project=self.project)

        for project in dbt.utils.dependency_projects(self.project):
            all_macros.extend(
                self.get_macros(this_project=self.project, own_project=project)
            )

        self.macro_generator = self.generate_macros(all_macros)

        enabled_models = [
            model for model in all_models
            if model.is_enabled and not model.is_empty
        ]

        compiled_models, written_models = self.compile_models(
            linker, enabled_models
        )

        compilers = {
            'schema tests': self.compile_schema_tests,
            'data tests': self.compile_data_tests,
            'archives': self.compile_archives,
            'analyses': self.compile_analyses
        }

        compiled = {
            'models': written_models
        }

        for (compile_type, compiler_f) in compilers.items():
            newly_compiled = compiler_f(linker, compiled_models)
            compiled[compile_type] = newly_compiled

        self.validate_models_unique(
            compiled['models'],
            dbt.utils.compiler_error
        )

        self.validate_models_unique(
            compiled['data tests'],
            dbt.utils.compiler_warning
        )

        self.validate_models_unique(
            compiled['schema tests'],
            dbt.utils.compiler_warning
        )

        self.write_graph_file(linker)

        stats = {ttype: len(m) for (ttype, m) in compiled.items()}
        return stats
