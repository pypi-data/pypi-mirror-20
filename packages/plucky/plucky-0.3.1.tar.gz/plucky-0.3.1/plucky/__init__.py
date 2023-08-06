"""
Plucking (deep) keys/paths safely from python collections has never been easier.
"""

__title__ = 'plucky'
__version__ = '0.3.1'
__author__ = 'Radomir Stevanovic'
__author_email__ = 'radomir.stevanovic@gmail.com'
__copyright__ = 'Copyright 2014 Radomir Stevanovic'
__license__ = 'MIT'
__url__ = 'https://github.com/randomir/plucky'

__all__ = ["pluck", "merge"]


import re
import operator
from copy import deepcopy
from itertools import chain


# Python2/3 string detection workaround to
# avoid dependance on `six` package.
try:
    basestring
except:
    basestring = str


def pluck(obj, selector, default=None):
    """Safe itemgetter for structured objects.
    Happily operates on all (nested) objects that implement the item getter, 
    i.e. the `[]` operator.

    The `selector` is ~
    ``(<key>|<index>|<slice>|\*)(\.(<key>|<index>|<slice>|\*))*``.
    Parts (keys) in the selector path are separated with a dot. If the key
    looks like a number it's interpreted as such, i.e. as an index (so beware
    of numeric string keys in `dict`s).
    Python slice syntax is supported with keys like: ``2:7``, ``:5``, ``::-1``.
    A special key is ``*``, equivalent to the slice-all op ``:``.

    Examples:
        obj = {
            'users': [{
                'uid': 1234,
                'name': {
                    'first': 'John',
                    'last': 'Smith',
                }
            }, {
                'uid': 2345,
                'name': {
                    'last': 'Bono'
                }
            }]
        }

        pluck(obj, 'users.1.name')
            -> {'last': 'Bono'}

        pluck(obj, 'users.*.name.last')
            -> ['Smith', 'Bono']

        pluck(obj, 'users.*.name.first')
            -> ['John']


    Note: since the dot `.` is used as a separator, keys can not contain dots.
    """
    
    def _filter(iterable, index):
        res = []
        for obj in iterable:
            try:
                res.append(obj[index])
            except:
                pass
        return res

    def _int(val):
        try:
            return int(val)
        except:
            return None

    def _parsekey(key):
        m = re.match(r"^(?P<index>-?\d+)$", key)
        if m:
            return int(m.group('index'))

        m = re.match(r"^(?P<start>-?\d+)?"\
                     r"(:(?P<stop>-?\d+)?(:(?P<step>-?\d+)?)?)?$", key)
        if m:
            return slice(_int(m.group('start')),
                         _int(m.group('stop')),
                         _int(m.group('step')))

        if key == '*':
            return slice(None)

        return key

    miss = False
    for key in selector.split('.'):
        index = _parsekey(key)
        
        if miss:
            if isinstance(index, basestring):
                obj = {}
            else:
                obj = []
        
        try:
            if isinstance(index, basestring):
                if isinstance(obj, list):
                    obj = _filter(obj, index)
                else:
                    obj = obj[index]
            else:
                obj = obj[index]
            miss = False
        except:
            miss = True
    
    if miss:
        return default
    else:
        return obj


def merge(a, b, op=None):
    """Immutable merge ``a`` structure with ``b`` using binary operator ``op``
    on leaf nodes.
    Merged structure is returned.
    """

    if op is None:
        op = operator.add

    if isinstance(a, dict) and isinstance(b, dict):
        result = {}
        for key in set(chain(a.keys(), b.keys())):
            if key in a and key in b:
                result[key] = merge(a[key], b[key], op)
            elif key in a:
                result[key] = deepcopy(a[key])
            elif key in b:
                result[key] = deepcopy(b[key])
        return result

    elif isinstance(a, list) and isinstance(b, list):
        if len(a) == len(b):
            # merge subelements
            result = []
            for idx in range(len(a)):
                result.append(merge(a[idx], b[idx], op))
            return result
        else:
            # merge lists
            return op(a, b)

    # all other merge ops should be handled by ``op``.
    # default ``operator.add`` will handle addition of numeric types, but fail
    # with TypeError for incompatible types (eg. str + None, etc.)
    return op(a, b)
