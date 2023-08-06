"""igcommit - Checks on files committed to Git

Copyright (c) 2016, InnoGames GmbH
"""

from re import compile
from subprocess import CalledProcessError, Popen, PIPE, STDOUT

from igcommit.base_check import BaseCheck, CheckState, Severity
from igcommit.git import Commit, CommittedFile
from igcommit.utils import get_exe_path

FILE_EXTENSIONS = {
    'php': compile('^php'),
    'pp': compile('^puppet'),
    'py': compile('^python'),
    'rb': compile('^ruby'),
    'sh': compile('sh$'),
    'js': compile('js$'),
}


class CommittedFileCheck(BaseCheck):
    """Parent class for checks on a single committed file

    To check the files, we have to skip for_commit_list(), for_commit(),
    and clone ourself on for_committed_file().  The subclasses has additional
    logic on those to filter out themselves for some cases.
    """
    committed_file = None

    def prepare(self, obj):
        new = super(CommittedFileCheck, self).prepare(obj)
        if not new or not isinstance(obj, CommittedFile):
            return new

        new = new.clone()
        new.committed_file = obj
        return new

    def __str__(self):
        return '{} on {}'.format(type(self).__name__, self.committed_file)


class CheckExecutable(CommittedFileCheck):
    """Special checks for executable files

    Git stores executable bits of the files.  We are running these checks only
    on the files executable bit is set.  It would have been nice to check
    the files which don't have this bit set, but has a shebang, at least
    to warn about it, as it is very common to omit executable bit on Git.
    However, it would be expensive to look at the content of every file.
    """
    def prepare(self, obj):
        new = super(CheckExecutable, self).prepare(obj)
        if not new or (
            isinstance(obj, CommittedFile) and not obj.owner_can_execute()
        ):
            return None
        return new

    def get_problems(self):
        extension = self.committed_file.get_extension()
        if extension == 'sh':
            yield Severity.WARNING, 'executable has file extension .sh'

        shebang = self.committed_file.get_shebang()
        if not shebang:
            yield Severity.ERROR, 'no shebang'
            return

        path = shebang.split(None, 1)[0]
        if not path.startswith('/'):
            yield (
                Severity.ERROR,
                'shebang executable {} is not full path'.format(path)
            )
        elif path == '/usr/bin/env':
            if shebang == path:
                yield Severity.ERROR, '/usr/bin/env must have an argument'
                return
        elif path.startswith('/usr'):
            yield (
                Severity.WARNING, 'shebang is not portable (use /usr/bin/env)'
            )

        if extension:
            for problem in self.get_exe_problems(extension):
                yield problem

    def get_exe_problems(self, extension):
        exe = self.committed_file.get_exe()
        if (
            extension in FILE_EXTENSIONS and
            not FILE_EXTENSIONS[extension].search(exe)
        ):
            yield (
                Severity.ERROR,
                'shebang executable "{}" doesn\'t match pattern "{}"'
                .format(exe, FILE_EXTENSIONS[extension].pattern)
            )
        for key, pattern in FILE_EXTENSIONS.items():
            if pattern.search(exe) and key != extension:
                yield (
                    Severity.WARNING,
                    'shebang executable {} matches with file extension ".{}"'
                    .format(exe, key)
                )


class CommittedFileByExtensionCheck(CommittedFileCheck):
    extension = None

    def prepare(self, obj):
        new = super(CommittedFileByExtensionCheck, self).prepare(obj)
        if not new or not isinstance(obj, CommittedFile):
            return new

        # All instances of this must specify a file extension.
        assert new.extension

        # We are being prepared for a committed file as last.  In this step,
        # we need to match the file with the specified file extension.
        # We first check the extension from the name of the file, and then
        # from the shebang of the file, if it is executable.
        if obj.get_extension() == new.extension:
            return new
        if (
            new.extension in FILE_EXTENSIONS and
            obj.owner_can_execute() and
            FILE_EXTENSIONS[new.extension].search(obj.get_exe())
        ):
            return new

        return None


class CheckCommand(CommittedFileByExtensionCheck):
    """Check command to be executed on file contents"""
    args = None
    exe_path = None
    header = 0
    footer = 0
    config_files = []
    config_required = False
    bogus_return_code = False

    def get_exe_path(self):
        if not self.exe_path:
            self.exe_path = get_exe_path(self.args[0])
        return self.exe_path

    def prepare(self, obj):
        new = super(CheckCommand, self).prepare(obj)
        if not new or not self.get_exe_path():
            return None

        if isinstance(obj, Commit):
            config_exists = new.prepare_configs(obj)
            if not config_exists and new.config_required:
                return None

        if isinstance(obj, CommittedFile):
            new.prepare_procs()

        return new

    def prepare_configs(self, commit):
        config_exists = False
        for config_file in self.config_files:
            prev_commit = config_file.commit
            config_file.commit = commit

            if not config_file.exists():
                continue
            config_exists = True

            # If the file is not changed on this commit, we can skip
            # downloading.
            if (prev_commit and (prev_commit == commit or (
                prev_commit.commit_list == commit.commit_list and
                not config_file.changed()
            ))):
                continue

            # We have to download the configuration file to the current
            # workspace to let the command find it.  It is not really safe
            # to do that.  The workspace might not be a good place to write
            # things.  Also, it is not safe to update this file, when it is
            # changed on different commits, because we run the commands
            # in parallel.  We are ignoring those problems, until they
            # start happening on production.
            config_file.write()

        return config_exists

    def prepare_procs(self):
        self.content_proc = self.committed_file.get_content_proc()
        self.check_proc = Popen(
            [self.get_exe_path()] + self.args[1:],
            stdin=self.content_proc.stdout,
            stdout=PIPE,
            stderr=STDOUT,
        )
        self.content_proc.stdout.close()   # Allow it to receive a SIGPIPE

    def get_problems(self):
        line_buffer = []
        for line_id, line in enumerate(self.check_proc.stdout):
            if line_id < self.header:
                continue
            line_buffer.append(line)
            if len(line_buffer) <= self.footer:
                continue
            yield self._format_problem(line_buffer.pop(0).strip().decode())

        if self.content_proc.poll() != 0:
            raise CalledProcessError(
                'Git command returned non-zero exit status {}'
                .format(self.content_proc.returncode)
            )
        if (
            self.check_proc.wait() != 0 and
            not self.bogus_return_code and
            not self.committed_file.commit.content_can_fail()
        ):
            self.set_state(CheckState.FAILED)

    def _format_problem(self, line):
        """We are piping the source from Git to the commands.  We want to
        hide the file path from the users as we show it already on the headers.
        """
        prefix = ''

        line_split = line.split(':', 3)
        if (
            len(line_split) == 4 and
            len(line_split[0]) >= len('stdin') and
            line_split[1].isdigit() and
            line_split[2].isdigit()
        ):
            prefix = 'line {}: col {}: '.format(*line_split[1:3])
            line = line_split[3].strip()
        else:
            if len(line_split) >= 2 and 'stdin' in line_split[0].lower():
                line = ':'.join(line_split[1:]).strip()
            if line.startswith('line '):
                line_split = line.split(' ', 2)
                line_num = line_split[1].strip(':,')
                if line_num.isdigit():
                    prefix += 'line ' + line_num + ': '
                    line = ' '.join(line_split[2:]).strip(':,')
            if line.startswith('col '):
                line_split = line.split(' ', 2)
                col_num = line_split[1].strip(':,')
                if col_num.isdigit():
                    prefix += 'col ' + col_num + ': '
                    line = ' '.join(line_split[2:]).strip(':,')

        severity, line = Severity.split(line)
        return severity, prefix + line

    def __str__(self):
        return '{} "{}" on {}'.format(
            type(self).__name__, self.args[0], self.committed_file
        )


class FormatCheck(CommittedFileByExtensionCheck):
    load_func = None
    exception_cls = ValueError

    def prepare(self, obj):
        new = super(FormatCheck, self).prepare(obj)
        if new and not new.load_func:
            if not new.configure():
                return None
        return new

    def get_problems(self):
        assert self.load_func and self.exception_cls

        content_proc = self.committed_file.get_content_proc()
        try:
            self.load_func(content_proc.stdout.read().decode())
        except self.exception_cls as error:
            yield Severity.ERROR, str(error)
        finally:
            content_proc.stdout.close()   # Allow it to receive a SIGPIPE

        if content_proc.poll() != 0:
            raise CalledProcessError(
                'Git command returned non-zero exit status {}'
                .format(content_proc.returncode)
            )


class CheckJSON(FormatCheck):
    extension = 'json'

    def configure(self):
        try:
            from json import loads
        except ImportError:
            return False

        self.load_func = loads

        # JSONDecodeError does not exist on old Python versions.
        try:
            from json.decoder import JSONDecodeError
        except ImportError:
            pass
        else:
            self.exception_cls = JSONDecodeError

        return True


class CheckXML(FormatCheck):
    extension = 'xml'

    def configure(self):
        try:
            from xml.etree import ElementTree
        except ImportError:
            return False

        self.load_func = ElementTree.fromstring
        self.exception_cls = ElementTree.ParseError
        return True


class CheckYAML(FormatCheck):
    extension = 'yaml'

    def configure(self):
        try:
            from yaml import load, YAMLError
        except ImportError:
            return False

        self.load_func = load
        self.exception_cls = YAMLError
        return True
