import collections
from syn.base_utils import istr, getfunc
from syn.type.a import Schema, List

from .base import Base, Harvester
from .meta import Attr, pre_create_hook, preserve_attr_data

#-------------------------------------------------------------------------------
# Constants

_LIST = '_list'

#-------------------------------------------------------------------------------
# ListWrapper


class ListWrapper(Base, Harvester):
    _attrs = dict(_list = Attr(list, internal=True, groups=('str_exclude',),
                               doc='The wrapped list'))
    _opts = dict(max_len = None,
                 min_len = None)
    
    def __init__(self, *args, **kwargs):
        max_len = self._opts.max_len
        ltype = self._attrs.types[_LIST]
        _args = self._opts.args

        if max_len is None or not _args:
            _list = ltype.coerce(list(args), seq_type_only=True)
            args = ()
        else:
            _list = ltype.coerce(list(args[:max_len]), seq_type_only=True)
            args = args[max_len:]

        _list.extend(kwargs.get(_LIST, ltype.coerce([], seq_type_only=True)))

        kwargs[_LIST] = _list
        super(ListWrapper, self).__init__(*args, **kwargs)

    @pre_create_hook
    def _harvest_attrs(clsdata):
        getfunc(Harvester._harvest_attrs)(clsdata)
        
        dct = {}
        clsdct = clsdata['dct']
        attrs = clsdct.get('_attrs', {})
        types = clsdct.get('types', [])
        schema = clsdct.get('schema', None)
        
        if types and schema:
            raise TypeError('Cannot specify both types and schema in {}'
                            .format(clsdata['clsname']))

        if types:
            dct['_list'] = Attr(List(tuple(types)))
        elif schema:
            dct['_list'] = Attr(Schema(schema))
    
        preserve_attr_data(attrs, dct)
        attrs.update(dct)
        clsdct['_attrs'] = attrs
            
    def _istr_attrs(self, base, pretty, indent):
        attrs = super(ListWrapper, self)._istr_attrs(base, pretty, indent)
        strs = [istr(val, pretty, indent) for val in self]
        ret = base.join(strs)
        ret = base.join([ret, attrs])
        return ret

    def __iter__(self):
        return iter(self._list)

    def __len__(self):
        return len(self._list)

    def __getitem__(self, item):
        return self._list[item]

    def __setitem__(self, item, value):
        self._list[item] = value

    def __delitem__(self, item):
        del self._list[item]

    @classmethod
    def _generate(cls, **kwargs):
        _list = []
        typ = cls._attrs['_list'].type
        kwargs['attrs'] = kwargs.get('attrs', {})

        if cls._opts.max_len is not None:
            max_len = cls._opts.max_len
            if 'max_len' in kwargs:
                if kwargs['max_len'] < max_len:
                    max_len = kwargs['max_len']
        else:
            max_len = kwargs.get('max_len', cls._opts.min_len)

        kwargs_ = dict(kwargs)
        if isinstance(typ, Schema):
            _list = typ.generate(**kwargs_)
        elif cls._opts.min_len:
            kwargs_['min_len'] = cls._opts.min_len
            kwargs_['max_len'] = max_len
            _list = typ.generate(**kwargs_)

        kwargs['attrs']['_list'] = _list
        return super(ListWrapper, cls)._generate(**kwargs)

    def append(self, item):
        self._list.append(item)

    def count(self, item):
        return self._list.count(item)

    def extend(self, items):
        self._list.extend(items)

    def index(self, item):
        return self._list.index(item)

    def insert(self, index, item):
        self._list.insert(index, item)

    def pop(self, index=-1):
        self._list.pop(index)

    def remove(self, item):
        self._list.remove(item)

    def reverse(self):
        self._list.reverse()

    def sort(self, *args, **kwargs):
        self._list.sort(*args, **kwargs)

    def validate(self):
        super(ListWrapper, self).validate()
        
        max_len = self._opts.max_len
        min_len = self._opts.min_len

        if max_len is not None:
            if len(self._list) > max_len:
                raise ValueError("can have at most %d elemsents; (got %d)"
                                 % (max_len, len(self._list)))

        if min_len is not None:
            if len(self._list) < min_len:
                raise ValueError("must have at least %d elemsents; (got %d)"
                                 % (min_len, len(self._list)))
        

collections.MutableSequence.register(ListWrapper)

#-------------------------------------------------------------------------------
# __all__

__all__ = ('ListWrapper',)

#-------------------------------------------------------------------------------
