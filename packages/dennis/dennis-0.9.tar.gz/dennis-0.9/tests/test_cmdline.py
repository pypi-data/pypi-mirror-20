from textwrap import dedent

from click.testing import CliRunner
import pytest

from dennis.cmdline import cli
from tests import build_po_string, nix_header


@pytest.fixture
def runner():
    """Creates a CliRunner"""
    return CliRunner()


def build_key_val(text):
    pairs = {}
    for line in text.splitlines():
        if ':' in line:
            key, val = line.split(':', 1)
            pairs[key.strip()] = val.strip()
    return pairs


class TestStatus:
    def test_help(self, runner):
        result = runner.invoke(cli, ('status', '--help'))
        assert result.exit_code == 0
        assert 'Usage' in result.output.splitlines()[0]

    def test_status_untranslated(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('status', str(fn)))
        assert result.exit_code == 0

        # FIXME: This would be a lot easier if the status was structured and parseable.
        pairs = build_key_val(result.output)
        assert pairs['Total strings'] == '1'
        assert pairs['Total translateable words'] == '3'
        assert pairs['Percentage'] == '0%'

    def test_status_translated(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr "Feh"\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('status', str(fn)))
        assert result.exit_code == 0

        # FIXME: This would be a lot easier if the status was structured and parseable.
        pairs = build_key_val(result.output)
        assert pairs['Total strings'] == '1'
        assert pairs['Total translateable words'] == '3'
        assert pairs['Percentage'] == '100% COMPLETE!'

    # FIXME: test --showuntranslated on .po file

    # FIXME: test --showfuzzy on .po file


class TestTranslate:
    def test_help(self, runner):
        result = runner.invoke(cli, ('translate', '--help'))
        assert result.exit_code == 0
        assert 'Usage' in result.output.splitlines()[0]

    def test_strings(self, runner):
        result = runner.invoke(cli, ('translate', '-p', 'shouty', '-s', 'ou812'))
        assert result.exit_code == 0
        assert 'OU812' in result.output

    def test_no_paths(self, runner):
        result = runner.invoke(cli, ('translate', '-p', 'shouty'))
        assert result.exit_code == 2
        last_line = result.output.splitlines()[-1]
        assert last_line == 'Error: nothing to work on. Use --help for help.'

    def test_pipe(self, runner):
        result = runner.invoke(cli, ('translate', '-p', 'shouty', '-'), input='foo bar')
        assert result.exit_code == 0
        assert result.output == 'FOO BAR\n'

    def test_pipeline(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)
        # Verify the last line is untranslated
        assert po_file.endswith('msgstr ""\n')

        result = runner.invoke(cli, ('translate', '-p', 'shouty', str(fn)))
        assert result.exit_code == 0
        last_line = fn.read().splitlines()[-1]
        # Verify the last line is now translated
        assert last_line == 'msgstr "FOO BAR BAZ"'

    def test_bad_pipeline(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('translate', '-p', 'triangle', str(fn)))
        assert result.exit_code == 2
        last_line = result.output.splitlines()[-1]
        assert last_line == 'Error: pipeline "triangle" is not valid'

    def test_nonexistent_file(self, runner, tmpdir):
        fn = tmpdir.join('missingfile.po')
        result = runner.invoke(cli, ('translate', '-p', 'shouty', str(fn)))
        assert result.exit_code == 2
        last_line = result.output.splitlines()[-1]
        assert last_line == 'Error: File %s does not exist.' % str(fn)

    def test_plurals(self, runner, tmpdir):
        po_file = build_po_string(
            '#: test_project/base/views.py:12 test_project/base/views.py:22\n'
            '#, python-format\n'
            'msgid "%(num)s apple"\n'
            'msgid_plural "%(num)s apples"\n'
            'msgstr[0] ""\n'
            'msgstr[1] ""\n'
        )
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('translate', '-p', 'shouty', str(fn)))
        assert result.exit_code == 0
        pot_file = nix_header(fn.read())
        # FIXME: This has the wrong variables, too. We need to fix that, too.
        assert (
            pot_file ==
            dedent("""\
            #: test_project/base/views.py:12 test_project/base/views.py:22
            #, python-format
            msgid "%(num)s apple"
            msgid_plural "%(num)s apples"
            msgstr[0] "%(NUM)S APPLE"
            msgstr[1] "%(NUM)S APPLES"
            """)
        )


class TestLint:
    def test_help(self, runner):
        result = runner.invoke(cli, ('lint', '--help'))
        assert result.exit_code == 0
        assert 'Usage' in result.output.splitlines()[0]

    def test_basic_linting(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr "Foo"\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', str(fn)))
        assert result.exit_code == 0
        output_lines = result.output.splitlines()
        assert len(output_lines) == 1
        assert output_lines[0].startswith('dennis version')

    def test_linting_non_ascii_filename(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(foo)s bar baz"\n'
            'msgstr "Foo %(bar)s"\n')
        fn = tmpdir.join('T\xc3\xa9l\xc3\xa9chargements', 'messages.po')
        fn.write(po_file, ensure=True)

        result = runner.invoke(cli, ('lint', str(tmpdir)))
        assert result.exit_code == 1

    def test_linting_fail(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(foo)s bar baz"\n'
            'msgstr "Foo %(bar)s"\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', str(fn)))
        assert result.exit_code == 1
        output_lines = result.output.splitlines()
        assert len(output_lines) == 16
        assert 'E201: invalid variables: %(bar)s' in result.output

    def test_no_files_to_work_on(self, runner):
        result = runner.invoke(cli, ('lint', 'foo'))
        assert result.exit_code == 2
        assert 'nothing to work on.' in result.output

    def test_nonexistent_file(self, runner, tmpdir):
        fn = tmpdir.join('missingfile.po')
        result = runner.invoke(cli, ('lint', str(fn)))
        assert result.exit_code == 2
        last_line = result.output.splitlines()[-1]
        assert last_line == 'Error: File "%s" does not exist.' % str(fn)

    def test_quiet(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo bar baz"\n'
            'msgstr "Foo"\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--quiet', str(fn)))
        assert result.exit_code == 0
        assert result.output == ''

    def test_rules(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(bar)s baz"\n'
            'msgstr "FOO %(bar) BAZ"\n')
        fn = tmpdir.join('messages.po')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--rules', 'E101', str(fn)))
        assert result.exit_code == 1
        assert 'E101: type missing: %(bar)' in result.output

    def test_template_rules(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(o)s baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.pot')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--rules', 'W501', str(fn)))
        assert result.exit_code == 0
        assert 'W501: one character variable name "o"' in result.output

    def test_nonexisting_rule(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(o)s baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.pot')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--rules', 'foo', str(fn)))
        assert result.exit_code == 2
        assert 'Error: invalid rules: foo.' in result.output

    def test_excludes(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(o)s baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.pot')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--excluderules', 'W501', str(fn)))
        assert result.exit_code == 0
        # The rule that generates this error is excluded, so this error shouldn't show up.
        assert 'W501: one character variable name "o"' not in result.output

    def test_varformat_no_value(self, runner, tmpdir):
        po_file = build_po_string(
            '#: foo/foo.py:5\n'
            'msgid "Foo %(o)s baz"\n'
            'msgstr ""\n')
        fn = tmpdir.join('messages.pot')
        fn.write(po_file)

        result = runner.invoke(cli, ('lint', '--varformat', '', str(fn)))

        assert result.exit_code == 0
        # We're not looking at any variables, so we should never have a variable related warning.
        assert 'W501: one character variable name "o"' not in result.output

    # FIXME: test --varformat with values

    # FIXME: test --reporter

    # FIXME: test --errorsonly
