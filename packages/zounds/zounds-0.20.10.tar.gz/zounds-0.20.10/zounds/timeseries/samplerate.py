from __future__ import division
from duration import Picoseconds
from collections import namedtuple
import numpy as np
from duration import Seconds

Stride = namedtuple('Stride', ['frequency', 'duration'])


class SampleRate(object):
    def __init__(self, frequency, duration):
        self.frequency = frequency
        self.duration = duration
        super(SampleRate, self).__init__()

    def __str__(self):
        f = self.frequency / Seconds(1)
        d = self.duration / Seconds(1)
        return '{self.__class__.__name__}(f={f}, d={d})'.format(**locals())

    def __repr__(self):
        return self.__str__()

    def __iter__(self):
        return iter((self.frequency, self.duration))

    def __len__(self):
        return 2

    def __eq__(self, other):
        return \
            self.frequency == other.frequency \
            and self.duration == other.duration

    @property
    def overlap(self):
        return self.duration - self.frequency

    def __mul__(self, other):
        try:
            if len(other) == 1:
                other *= 2
        except TypeError:
            other = (other, other)

        freq = self.frequency * other[0]
        duration = (self.frequency * other[1]) + self.overlap
        new = SampleRate(freq, duration)
        print self, new
        return new

    def discrete_samples(self, ts):
        """
        Compute the frequency and duration in discrete samples
        :param ts: A ConstantRateTimeSeries instance
        :return: A tuple, representing the frequency and duration in discrete
        samples, respectively
        """
        td = ts.dimensions[0]
        windowsize = np.round((self.duration - td.overlap) / td.frequency)
        stepsize = np.round(self.frequency / td.frequency)
        return int(stepsize), int(windowsize)


class AudioSampleRate(SampleRate):
    def __init__(self, samples_per_second, suggested_window, suggested_hop):
        self.suggested_hop = suggested_hop
        self.suggested_window = suggested_window
        self.one_sample = Picoseconds(int(1e12)) // samples_per_second
        super(AudioSampleRate, self).__init__(self.one_sample, self.one_sample)

    def __int__(self):
        return self.samples_per_second

    @property
    def samples_per_second(self):
        return int(Picoseconds(int(1e12)) / self.frequency)

    @property
    def nyquist(self):
        return self.samples_per_second // 2

    def half_lapped(self):
        return SampleRate(
                self.one_sample * self.suggested_hop,
                self.one_sample * self.suggested_window)


class SR96000(AudioSampleRate):
    def __init__(self):
        super(SR96000, self).__init__(96000, 4096, 2048)


class SR48000(AudioSampleRate):
    def __init__(self):
        super(SR48000, self).__init__(48000, 2048, 1024)


class SR44100(AudioSampleRate):
    def __init__(self):
        super(SR44100, self).__init__(44100, 2048, 1024)


class SR22050(AudioSampleRate):
    def __init__(self):
        super(SR22050, self).__init__(22050, 1024, 512)


class SR11025(AudioSampleRate):
    def __init__(self):
        super(SR11025, self).__init__(11025, 512, 256)


_samplerates = (SR96000(), SR48000(), SR44100(), SR22050(), SR11025())


def audio_sample_rate(samples_per_second):
    for sr in _samplerates:
        if samples_per_second == sr.samples_per_second:
            return sr
    raise ValueError(
            '{samples_per_second} is an invalid sample rate'.format(**locals()))


class HalfLapped(SampleRate):
    def __init__(self, window_at_44100=2048, hop_at_44100=1024):
        one_sample_at_44100 = Picoseconds(int(1e12)) / 44100.
        window = one_sample_at_44100 * window_at_44100
        step = one_sample_at_44100 * hop_at_44100
        super(HalfLapped, self).__init__(step, window)
