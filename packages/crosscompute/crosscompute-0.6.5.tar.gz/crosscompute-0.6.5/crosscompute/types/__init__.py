import codecs
import logging
from abc import ABCMeta
from collections import OrderedDict
from invisibleroads_macros.configuration import (
    make_absolute_paths, resolve_attribute)
from invisibleroads_macros.log import log_traceback, parse_nested_dictionary
from six import add_metaclass, text_type
from stevedore.extension import ExtensionManager

from ..exceptions import DataParseError, DataTypeError


DATA_TYPE_BY_NAME = {}
DATA_TYPE_BY_SUFFIX = {}
RESERVED_ARGUMENT_NAMES = ['target_folder']
LOG = logging.getLogger(__name__)
LOG.addHandler(logging.NullHandler())


class DataItem(object):

    def __init__(self, key, value, data_type, file_location='', help_text=''):
        self.key = key
        self.value = value
        self.data_type = data_type
        self.file_location = file_location
        self.help_text = help_text

    def render_value(self, *args, **kw):
        x = self.data_type.render(self.value, *args, **kw)
        return '' if x is None else x


@add_metaclass(ABCMeta)
class DataType(object):
    suffixes = ()
    formats = ()
    style = None
    script = None
    template = None
    views = ()

    @classmethod
    def save(Class, path, value):
        codecs.open(path, 'w', encoding='utf-8').write(value)

    @classmethod
    def load_safely(Class, path):
        try:
            value = Class.load(path)
        except (IOError, DataTypeError):
            value = None
        return value

    @classmethod
    def load(Class, path):
        return codecs.open(path, encoding='utf-8').read()

    @classmethod
    def parse(Class, text):
        return text

    @classmethod
    def merge(Class, default_value, value):
        return value

    @classmethod
    def render(Class, value):
        return value

    @classmethod
    def get_file_name(Class):
        return '%s.%s' % (Class.suffixes[0], Class.formats[0])


class StringType(DataType):
    suffixes = 'string',
    formats = 'txt',
    template = 'crosscompute:types/string.jinja2'

    @classmethod
    def parse(Class, text):
        if not isinstance(text, str) or isinstance(text, text_type):
            return text
        return text.decode('utf-8')


def initialize_data_types(suffix_by_data_type=None):
    for x in ExtensionManager('crosscompute.types').extensions:
        data_type = x.plugin
        for suffix in data_type.suffixes:
            DATA_TYPE_BY_SUFFIX[suffix] = data_type
        DATA_TYPE_BY_NAME[x.name] = data_type
    for suffix, data_type_spec in (suffix_by_data_type or {}).items():
        data_type = resolve_attribute(data_type_spec)
        DATA_TYPE_BY_SUFFIX[suffix] = data_type


def get_data_type(key):
    for suffix, data_type in DATA_TYPE_BY_SUFFIX.items():
        if key.endswith('_' + suffix):
            return data_type
    return StringType


def parse_data_dictionary(text, root_folder, tool_definition):
    d = parse_nested_dictionary(
        text, is_key=lambda x: ':' not in x and ' ' not in x)
    return parse_data_dictionary_from(d, root_folder, tool_definition)


def parse_data_dictionary_from(raw_dictionary, root_folder, tool_definition):
    d = make_absolute_paths(raw_dictionary, root_folder)
    errors = OrderedDict()
    for key, value in d.items():
        data_type = get_data_type(key)
        try:
            value = data_type.parse(value)
        except DataTypeError as e:
            errors[key] = text_type(e)
        except Exception as e:
            log_traceback(LOG, {'key': key, 'value': value})
            errors[key] = 'could_not_parse'
        if key in tool_definition:
            old_value = data_type.parse(tool_definition[key])
            if old_value != value:
                value = data_type.merge(old_value, value)
        d[key] = value
        if not key.endswith('_path'):
            continue
        noun = key[:-5]
        data_type = get_data_type(noun)
        try:
            data_type.load(value)
        except DataTypeError as e:
            errors[noun] = text_type(e)
        except (IOError, Exception) as e:
            log_traceback(LOG, {'key': key, 'value': value})
            errors[noun] = 'could_not_load'
    if errors:
        raise DataParseError(errors, d)
    return d
