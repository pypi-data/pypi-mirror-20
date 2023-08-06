import hashlib
import jinja2
from dbt.utils import compiler_error, to_unicode
from dbt.adapters.factory import get_adapter
import dbt.model


class CompiledModel(object):
    def __init__(self, fqn, data):
        self.fqn = fqn
        self.data = data
        self.nice_name = ".".join(fqn)

        # these are set just before the models are executed
        self.tmp_drop_type = None
        self.final_drop_type = None
        self.profile = None

        self.skip = False
        self._contents = None
        self.compiled_contents = None

    def __getitem__(self, key):
        return self.data[key]

    def hashed_name(self):
        fqn_string = ".".join(self.fqn)
        return hashlib.md5(fqn_string.encode('utf-8')).hexdigest()

    def context(self):
        return self.data

    def hashed_contents(self):
        return hashlib.md5(self.contents.encode('utf-8')).hexdigest()

    def do_skip(self):
        self.skip = True

    def should_skip(self):
        return self.skip

    def is_type(self, run_type):
        return self.data['dbt_run_type'] == run_type

    def is_test_type(self, test_type):
        return self.data.get('dbt_test_type') == test_type

    def is_test(self):
        return self.data['dbt_run_type'] == dbt.model.NodeType.Test

    @property
    def contents(self):
        if self._contents is None:
            with open(self.data['build_path']) as fh:
                self._contents = to_unicode(fh.read(), 'utf-8')
        return self._contents

    def compile(self, context, profile, existing):
        self.prepare(existing, profile)

        contents = self.contents
        try:
            env = jinja2.Environment()
            self.compiled_contents = env.from_string(contents).render(context)
            return self.compiled_contents
        except jinja2.exceptions.TemplateSyntaxError as e:
            compiler_error(self, str(e))

    @property
    def materialization(self):
        return self.data['materialized']

    @property
    def name(self):
        return self.data['name']

    @property
    def tmp_name(self):
        return self.data['tmp_name']

    def project(self):
        return {'name': self.data['project_name']}

    @property
    def schema(self):
        if self.profile is None:
            raise RuntimeError(
                "`profile` not set in compiled model {}".format(self)
            )
        else:
            return get_adapter(self.profile).get_default_schema(self.profile)

    def should_execute(self, args, existing):
        if args.non_destructive and \
           self.materialization == 'view' and \
           self.name in existing:

            return False
        else:
            return self.data['enabled'] and self.materialization != 'ephemeral'

    def should_rename(self, args):
        if args.non_destructive and self.materialization == 'table':
            return False
        else:
            return self.materialization in ['table', 'view']

    def prepare(self, existing, profile):
        if self.materialization == 'incremental':
            tmp_drop_type = None
            final_drop_type = None
        else:
            tmp_drop_type = existing.get(self.tmp_name, None)
            final_drop_type = existing.get(self.name, None)

        self.tmp_drop_type = tmp_drop_type
        self.final_drop_type = final_drop_type
        self.profile = profile

    def __repr__(self):
        return "<CompiledModel {}.{}: {}>".format(
            self.data['project_name'], self.name, self.data['build_path']
        )


class CompiledTest(CompiledModel):
    def __init__(self, fqn, data):
        super(CompiledTest, self).__init__(fqn, data)

    def should_rename(self):
        return False

    def should_execute(self, args, existing):
        return True

    def prepare(self, existing, profile):
        self.profile = profile

    def __repr__(self):
        return "<CompiledModel {}.{}: {}>".format(
            self.data['project_name'], self.name, self.data['build_path']
        )


class CompiledArchive(CompiledModel):
    def __init__(self, fqn, data):
        super(CompiledArchive, self).__init__(fqn, data)

    def should_rename(self):
        return False

    def should_execute(self, args, existing):
        return True

    def prepare(self, existing, profile):
        self.profile = profile

    def __repr__(self):
        return "<CompiledArchive {}.{}: {}>".format(
            self.data['project_name'], self.name, self.data['build_path']
        )


class CompiledAnalysis(CompiledModel):
    def __init__(self, fqn, data):
        super(CompiledAnalysis, self).__init__(fqn, data)

    def should_rename(self):
        return False

    def should_execute(self, args, existing):
        return False

    def __repr__(self):
        return "<CompiledAnalysis {}.{}: {}>".format(
            self.data['project_name'], self.name, self.data['build_path']
        )


def make_compiled_model(fqn, data):
    run_type = data['dbt_run_type']

    if run_type == dbt.model.NodeType.Model:
        return CompiledModel(fqn, data)

    elif run_type == dbt.model.NodeType.Test:
        return CompiledTest(fqn, data)

    elif run_type == dbt.model.NodeType.Archive:
        return CompiledArchive(fqn, data)

    elif run_type == dbt.model.NodeType.Analysis:
        return CompiledAnalysis(fqn, data)

    else:
        raise RuntimeError("invalid run_type given: {}".format(run_type))
