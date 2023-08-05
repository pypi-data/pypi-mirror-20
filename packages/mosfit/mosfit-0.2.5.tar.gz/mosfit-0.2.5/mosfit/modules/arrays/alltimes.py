from mosfit.modules.module import Module

CLASS_NAME = 'AllTimes'


class AllTimes(Module):
    """Create lists of observations that are either only real observations or
    also include interpolations/extrapolations.
    """

    def __init__(self, **kwargs):
        super(AllTimes, self).__init__(**kwargs)
        self._bands = []
        self._systems = []
        self._instruments = []
        self._bandsets = []

    def process(self, **kwargs):
        old_bands = (self._systems, self._instruments, self._bandsets,
                     self._bands)
        if (kwargs.get('root', 'output') == 'output' and
                'extra_times' in kwargs):
            obslist = (
                list(
                    zip(*(kwargs['times'], kwargs['systems'], kwargs[
                        'instruments'], kwargs['bandsets'], kwargs['bands'],
                          [True for x in range(len(kwargs['times']))]))) +
                list(
                    zip(*(kwargs['extra_times'], kwargs[
                        'extra_systems'], kwargs['extra_instruments'], kwargs[
                            'extra_bandsets'], kwargs['extra_bands'],
                          [False for x in range(len(kwargs['extra_times']))])))
            )
            obslist.sort()

            (self._times, self._systems, self._instruments, self._bandsets,
             self._bands, self._observed) = zip(*obslist)
        else:
            self._times = kwargs['times']
            self._systems = kwargs['systems']
            self._instruments = kwargs['instruments']
            self._bandsets = kwargs['bandsets']
            self._bands = kwargs['bands']
            self._observed = [True for x in kwargs['times']]

        outputs = {}
        outputs['all_times'] = self._times
        outputs['all_systems'] = self._systems
        outputs['all_instruments'] = self._instruments
        outputs['all_bandsets'] = self._bandsets
        outputs['all_bands'] = self._bands
        if old_bands != (self._systems, self._instruments, self._bandsets,
                         self._bands):
            self._all_band_indices = [
                self._filters.find_band_index(
                    w, instrument=x, bandset=y, system=z)
                for w, x, y, z in zip(self._bands, self._instruments,
                                      self._bandsets, self._systems)
            ]
        outputs['all_band_indices'] = self._all_band_indices
        outputs['observed'] = self._observed
        return outputs

    def receive_requests(self, **requests):
        self._filters = requests.get('filters', None)
