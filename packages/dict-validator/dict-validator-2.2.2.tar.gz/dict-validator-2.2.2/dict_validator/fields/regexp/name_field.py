# coding=utf-8

import re

from dict_validator.fields import RegexpField


class NameField(RegexpField):
    """
    Human name represented with ASCII characters - e.g. John Smith

    :param lowercase_allowed: if True - the name may contain lowercase parts

    >>> from dict_validator import validate

    >>> class Schema:
    ...     field = NameField()

    Expects one or more name parts delimited with space

    >>> list(validate(Schema, {"field": 'John Smith'}))
    []

    Only ASCII charset is allowed

    >>> list(validate(Schema, {"field": 'John Smith Äjil'}))
    [(['field'], 'Did not match Regexp(name)')]

    Only letters are allowed in the name

    >>> list(validate(Schema, {"field": 'John Smith022'}))
    [(['field'], "Name can't contain digits")]

    By default each name part must be capitalized

    >>> list(validate(Schema, {"field": 'John mcFault'}))
    [(['field'], 'One of the name parts is not capitalized')]

    Non capitalized name parts can be enabled though

    >>> class Schema:
    ...     field = NameField(lowercase_allowed=True)

    >>> list(validate(Schema, {"field": 'John mcFault'}))
    []

    """

    def __init__(self, lowercase_allowed=False, *args, **kwargs):
        super(NameField, self).__init__(
            r"^\w+( \w+)*$",
            "name", *args, **kwargs)
        self._lowercase_allowed = lowercase_allowed

    def _validate(self, value):
        ret_val = super(NameField, self)._validate(value)
        if ret_val:
            return ret_val
        if not self._lowercase_allowed:
            for word in value.split():
                if unicode(word[0]).islower():
                    return "One of the name parts is not capitalized"
        if re.search(r"[0-9_]+", value):
            return "Name can't contain digits"
