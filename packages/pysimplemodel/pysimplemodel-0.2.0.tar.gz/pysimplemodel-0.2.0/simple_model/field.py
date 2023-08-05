# Copyright (c) 2017 Luiz Menezes
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

from typing import List

from .exceptions import EmptyField


class ModelField:
    def __init__(self, model, name, value, allow_empty):
        self._model = model
        self._name = name
        self._value = value
        self.allow_empty = allow_empty

        try:
            self._validate = getattr(model, 'validate_{}'.format(name))
        except AttributeError:
            self._validate = None

        try:
            self._clean = getattr(model, 'clean_{}'.format(name))
        except AttributeError:
            self._clean = None

    def __repr__(self):
        return '{}({}={!r})'.format(type(self).__name__, self.name, self.value)

    def __str__(self):
        return str(self.value)

    def _set_model_value(self, value):
        if value is self._model:
            raise TypeError('Cannot set {!r} value to the model it is part of'.format(self))

        setattr(self._model, self.name, value)

    @property
    def name(self):
        return self._name

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        self._value = value
        self._set_model_value(value)

    def clean(self):
        if not self._clean:
            return self.value

        self.value = self._clean(self.value)

    def validate(self):
        if not self.allow_empty and not self._model.is_empty(self.value):
            raise EmptyField(self.name)

        if not self._validate:
            return

        self._validate(self.value)

    def serialize(self):
        try:
            return self.value.serialize()
        except AttributeError:
            serialized = None

        if isinstance(self.value, (List, tuple)):
            serialized = []
            for value in self.value:
                try:
                    serialized.append(value.serialize())
                except AttributeError:
                    serialized.append(value)

        return self.value if serialized is None else serialized
