from samplerate import AudioSampleRate, audio_sample_rate
from soundfile import SoundFile
from io import BytesIO
from zounds.core import IdentityDimension, ArrayWithUnits
from timeseries import TimeDimension
from duration import Picoseconds
from samplerate import SampleRate


class AudioSamples(ArrayWithUnits):
    def __new__(cls, array, samplerate):
        if array.ndim == 1:
            dimensions = [TimeDimension(*samplerate)]
        elif array.ndim == 2:
            dimensions = [TimeDimension(*samplerate), IdentityDimension()]
        else:
            raise ValueError(
                    'array must be one (mono) or two (multi-channel) dimensions')

        if not isinstance(samplerate, AudioSampleRate):
            raise TypeError('samplerate should be an AudioSampleRate instance')

        return ArrayWithUnits.__new__(cls, array, dimensions)

    def __add__(self, other):
        try:
            if self.samplerate != other.samplerate:
                raise ValueError(
                        'Samplerates must match, but they were '
                        '{self.samplerate} and {other.samplerate}'
                        .format(**locals()))
        except AttributeError:
            pass
        return super(AudioSamples, self).__add__(other)

    def kwargs(self):
        return {'samplerate': self.samplerate}

    def sum(self, axis=None, dtype=None, **kwargs):
        result = super(AudioSamples, self).sum(axis, dtype, **kwargs)
        if self.ndim == 2 and axis == 1:
            return AudioSamples(result, self.samplerate)
        else:
            return result

    @property
    def samples_per_second(self):
        return int(Picoseconds(int(1e12)) / self.frequency)

    @property
    def duration_in_seconds(self):
        return self.duration / Picoseconds(int(1e12))

    @property
    def samplerate(self):
        return SampleRate(self.frequency, self.duration)

    @property
    def overlap(self):
        return self.samplerate.overlap

    @property
    def span(self):
        return self.dimensions[0].span

    @property
    def end(self):
        return self.dimensions[0].end

    @property
    def frequency(self):
        return self.dimensions[0].frequency

    @property
    def duration(self):
        return self.dimensions[0].duration

    @classmethod
    def from_example(cls, arr, example):
        return cls(arr, example.samplerate)

    @property
    def channels(self):
        if len(self.shape) == 1:
            return 1
        return self.shape[1]

    @property
    def samplerate(self):
        return audio_sample_rate(self.samples_per_second)

    @property
    def mono(self):
        if self.channels == 1:
            return self
        x = self.sum(axis=1) * 0.5
        y = x * 0.5
        return AudioSamples(y, self.samplerate)

    def encode(self, flo=None, fmt='WAV', subtype='PCM_16'):
        flo = flo or BytesIO()
        with SoundFile(
                flo,
                mode='w',
                channels=self.channels,
                format=fmt,
                subtype=subtype,
                samplerate=self.samples_per_second) as f:
            f.write(self)
        flo.seek(0)
        return flo
