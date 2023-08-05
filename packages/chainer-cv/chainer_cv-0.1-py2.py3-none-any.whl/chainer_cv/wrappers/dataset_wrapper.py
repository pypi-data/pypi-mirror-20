import six

import chainer
from chainer.utils import type_check


class DatasetWrapper(chainer.dataset.DatasetMixin):

    def __init__(self, dataset):
        self.dataset = dataset
        self._update_wrapper_stack()

    def _update_wrapper_stack(self):
        """
        Keep a list of all the wrappers that have been appended to the stack.
        """
        self._wrapper_stack = getattr(self.dataset, '_wrapper_stack', [])
        self._wrapper_stack.append(self)

    def __len__(self):
        return len(self.dataset)

    def __getattr__(self, attr):
        if attr == 'get_example':
            return self.get_example
        elif attr == '__getitem__':
            return self.__getitem__
        orig_attr = getattr(self.dataset, attr)
        return orig_attr

    def __getitem__(self, index):
        """Returns an example or a sequence of examples.

        It implements the standard Python indexing. It uses the
        :meth:`get_example` method by default, but it may be overridden by the
        implementation to, for example, improve the slicing performance.

        """
        if isinstance(index, slice):
            current, stop, step = index.indices(len(self))
            ret = []
            while current < stop and step > 0 or current > stop and step < 0:
                in_data = self.get_example(current)
                self._check_data_type_get_example(in_data)
                ret.append(in_data)
                current += step
            return ret
        else:
            in_data = self.get_example(index)
            self._check_data_type_get_example(in_data)
            return in_data

    def get_example(self, i):
        return self.dataset[i]

    def _check_data_type_get_example(self, in_data):
        in_type = type_check.get_types(in_data, 'in_types', False)
        try:
            self.check_type_get_example(in_type)
        except type_check.InvalidType as e:
            msg = """
Invalid operation is performed in: {0} (get_example)

{1}""".format(self.label, str(e))
            six.raise_from(
                type_check.InvalidType(e.expect, e.actual, msg=msg), None)

    def check_type_get_example(self, in_types):
        """Checks types of input data before forward propagation.

        Before :meth:`get_example` is called, this function is called.
        You need to validate types of input data in this function
        using :ref:`the type checking utilities <type-check-utils>`.

        Args:
            in_types (~chainer.utils.type_check.TypeInfoTuple): The type
                information of input data for :meth:`get_example`.
        """
        pass

    def __str__(self):
        return '<{}{}>'.format(type(self).__name__, self.dataset)

    def __repr__(self):
        return str(self)
