"""
"""

# Created on 2014.04.26
#
# Author: Giovanni Cannata
#
# Copyright 2014, 2015, 2016, 2017 Giovanni Cannata
#
# This file is part of ldap3.
#
# ldap3 is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# ldap3 is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with ldap3 in the COPYING and COPYING.LESSER files.
# If not, see <http://www.gnu.org/licenses/>.

from base64 import b64encode, b64decode
import datetime
import re

from .. import SEQUENCE_TYPES, STRING_TYPES, NUMERIC_TYPES, get_config_parameter
from ..utils.ciDict import CaseInsensitiveDict
from ..core.exceptions import LDAPDefinitionError


def to_unicode(obj, encoding=None):
    """Tries to convert bytes (and str in python2) to unicode. Return object unmodified if python3 string, else raise an exception
    """
    if isinstance(obj, NUMERIC_TYPES):
        obj = str(obj)

    if isinstance(obj, (bytes, bytearray)):
        if encoding is None:
            encoding = get_config_parameter('DEFAULT_ENCODING')
        return obj.decode(encoding)

    if isinstance(obj, STRING_TYPES):  # python3 strings, python 2 unicode
        return obj

    raise UnicodeError("Unable to convert to unicode %r" % obj)


def to_raw(obj, encoding='utf-8'):
    """Tries to convert to raw bytes from unicode"""
    if isinstance(obj, NUMERIC_TYPES):
        obj = str(obj)

    if not (isinstance(obj, bytes)):
        if isinstance(obj, SEQUENCE_TYPES):
            return [to_raw(element) for element in obj]
        elif isinstance(obj, STRING_TYPES):
            return obj.encode(encoding)

    return obj


def escape_filter_chars(text, encoding=None):
    """ Escape chars mentioned in RFC4515. """

    if encoding is None:
        encoding = get_config_parameter('DEFAULT_ENCODING')

    text = to_unicode(text, encoding)
    escaped = text.replace('\\', '\\5c')
    escaped = escaped.replace('*', '\\2a')
    escaped = escaped.replace('(', '\\28')
    escaped = escaped.replace(')', '\\29')
    escaped = escaped.replace('\x00', '\\00')
    # escape all octets greater than 0x7F that are not part of a valid UTF-8
    # escaped = ''.join(c if c <= '\x7f' else escape_bytes(to_raw(to_unicode(c, encoding))) for c in output)
    return escaped


def escape_bytes(bytes_value):
    """ Convert a byte sequence to a properly escaped for LDAP (format BACKSLASH HEX HEX) string"""
    if bytes_value:
        if str != bytes:  # Python 3
            if isinstance(bytes_value, str):
                bytes_value = bytearray(bytes_value, encoding='utf-8')
            escaped = '\\'.join([('%02x' % int(b)) for b in bytes_value])
        else:  # Python 2
            if isinstance(bytes_value, unicode):
                bytes_value = bytes_value.encode('utf-8')
            escaped = '\\'.join([('%02x' % ord(b)) for b in bytes_value])
    else:
        escaped = ''

    return ('\\' + escaped) if escaped else ''


def prepare_for_stream(value):
    if str != bytes:  # Python 3
        return value
    else:  # Python 2
        return value.decode()


# def check_escape(raw_string):
#     if isinstance(raw_string, bytes) or '\\' not in raw_string:
#         return raw_string
#
#     escaped = ''
#     i = 0
#     while i < len(raw_string):
#         if raw_string[i] == '\\' and i < len(raw_string) - 2:
#             try:
#                 value = int(raw_string[i + 1: i + 3], 16)
#                 escaped += chr(value)
#                 i += 2
#             except ValueError:
#                 escaped += '\\\\'
#         else:
#             escaped += raw_string[i]
#         i += 1
#
#     return escaped


def json_encode_b64(obj):
    try:
        return dict(encoding='base64', encoded=b64encode(obj))
    except Exception as e:
        raise LDAPDefinitionError('unable to encode ' + str(obj) + ' - ' + str(e))


# noinspection PyProtectedMember
def check_json_dict(json_dict):
    # needed for python 2

    for k, v in json_dict.items():
        if isinstance(v, dict):
            check_json_dict(v)
        elif isinstance(v, CaseInsensitiveDict):
            check_json_dict(v._store)
        elif isinstance(v, SEQUENCE_TYPES):
            for i, e in enumerate(v):
                if isinstance(e, dict):
                    check_json_dict(e)
                elif isinstance(e, CaseInsensitiveDict):
                    check_json_dict(e._store)
                else:
                    v[i] = format_json(e)
        else:
            json_dict[k] = format_json(v)


def json_hook(obj):
    if hasattr(obj, 'keys') and len(list(obj.keys())) == 2 and 'encoding' in obj.keys() and 'encoded' in obj.keys():
        return b64decode(obj['encoded'])

    return obj


# noinspection PyProtectedMember
def format_json(obj):
    if isinstance(obj, CaseInsensitiveDict):
        return obj._store

    if isinstance(obj, datetime.datetime):
        return str(obj)

    if isinstance(obj, int):
        return obj

    if str == bytes:
        if isinstance(obj, long):  # long exists only in python2
            return obj

    try:
        if str != bytes:  # python3
            if isinstance(obj, bytes):
                # return check_escape(str(obj, 'utf-8', errors='strict'))
                return str(obj, 'utf-8', errors='strict')
            raise LDAPDefinitionError('unable to serialize ' + str(obj))
        else:  # python2
            if isinstance(obj, unicode):
                return obj
            else:
                # return unicode(check_escape(obj))
                return unicode(obj)
    except (TypeError, UnicodeDecodeError):
        pass

    try:
        return json_encode_b64(bytes(obj))
    except Exception:
        pass

    raise LDAPDefinitionError('unable to serialize ' + str(obj))


def is_filter_escaped(text):
    if not type(text) == ((bytes != str) and str or unicode):  # requires str for Py3 or unicode for Py2
        raise ValueError('unicode input expected')

    return all(c not in text for c in '()*\0') and not re.search('\\\\([^0-9a-fA-F]|(.[^0-9a-fA-F]))', text)
