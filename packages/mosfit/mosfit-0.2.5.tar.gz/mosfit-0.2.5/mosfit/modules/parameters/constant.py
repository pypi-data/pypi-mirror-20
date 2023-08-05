from mosfit.modules.parameters.parameter import Parameter

CLASS_NAME = 'Constant'


class Constant(Parameter):
    """Parameter that will throw an error if the user attempts to make the
    variable free.
    """

    def __init__(self, **kwargs):
        super(Constant, self).__init__(**kwargs)
        if self._min_value is not None or self._max_value is not None:
            raise ValueError('`Constant` class cannot be assigned minimum and '
                             'maximum values!')
