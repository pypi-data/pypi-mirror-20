from argparse import ArgumentParser, SUPPRESS
from invisibleroads_macros.configuration import unicode_safely
from invisibleroads_macros.iterable import sort_dictionary
from os import getcwdu
from sys import argv

from ..exceptions import DataParseError
from ..models import Result
from ..types import (
    parse_data_dictionary_from, DATA_TYPE_BY_SUFFIX, RESERVED_ARGUMENT_NAMES)
from . import ToolScript, run_script


class RunScript(ToolScript):

    def configure(self, argument_subparser):
        super(RunScript, self).configure(argument_subparser)
        argument_subparser.add_argument(
            '--upgrade', action='store_true', help='upgrade dependencies')

    def run(self, args):
        tool_definition, data_folder = super(RunScript, self).run(args)
        tool_name = tool_definition['tool_name']
        argument_parser = ArgumentParser(tool_name)
        argument_parser.add_argument(
            'tool_name', nargs='?', help=SUPPRESS, type=unicode_safely)
        argument_parser.add_argument(
            '--target_folder', type=unicode_safely, metavar='FOLDER')
        argument_parser = configure_argument_parser(
            argument_parser, tool_definition)
        raw_arguments = sort_dictionary(argument_parser.parse_known_args(
            argv[2:])[0].__dict__, tool_definition['argument_names'])
        try:
            result_arguments = parse_data_dictionary_from(
                raw_arguments, getcwdu(), tool_definition)
        except DataParseError as e:
            return [(k + '.error', v) for k, v in e.message_by_name.items()]
        result_folder = Result.spawn_folder(data_folder)
        target_folder = raw_arguments.get('target_folder')
        run_script(
            tool_definition, result_arguments, result_folder, target_folder)


def configure_argument_parser(argument_parser, tool_definition):
    'Expose tool arguments as command-line arguments'
    for k in tool_definition['argument_names']:
        if k in RESERVED_ARGUMENT_NAMES:
            continue
        d = {}
        if k in tool_definition:
            d['default'] = tool_definition[k]
        else:
            d['required'] = True
        for suffix in DATA_TYPE_BY_SUFFIX:
            if k.endswith('_' + suffix):
                d['metavar'] = suffix.upper()
                break
        else:
            if k.endswith('_folder'):
                d['metavar'] = 'FOLDER'
            elif k.endswith('_path'):
                d['metavar'] = 'PATH'
        argument_parser.add_argument('--' + k, type=unicode_safely, **d)
    return argument_parser
