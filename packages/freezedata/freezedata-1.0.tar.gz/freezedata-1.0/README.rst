==========
freezedata
==========

Convert lists to tuples, sets to frozensets, dicts to mappingproxy etc., recursively.

Example usage:::

    import freezedata

    data = {'a': [1,2,3], 'b': {1,2,3}, 'c': {1:1, 2:2, 3:3}}
    frozendata = freezedata.freeze_data(data)
    print(frozendata)
    >> {'a': (1, 2, 3), 'b': frozenset({1, 2, 3}), 'c': mappingproxy({1: 1, 2: 2, 3: 3})}

**Notice**: Since a `mappingproxy` is not hashable, frozen data
structures containing `mappingproxy`s are not hashable either.::

    hash(frozendata)
    >> TypeError: unhashable type: 'mappingproxy'