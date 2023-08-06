import unittest2
import numpy as np
from duration import Seconds
from zounds.core import ArrayWithUnits
from timeseries import TimeDimension
from samplerate import \
    SampleRate, SR96000, SR48000, SR44100, SR22050, SR11025, audio_sample_rate, \
    HalfLapped


class SampleRateTests(unittest2.TestCase):

    def test_can_unpack_samplerate(self):
        sr = SampleRate(Seconds(1), Seconds(2))
        frequency, duration = sr
        self.assertEqual(Seconds(1), frequency)
        self.assertEqual(Seconds(2), duration)

    def test_can_unpack_audio_samplerate(self):
        sr = SR44100()
        frequency, duration = sr
        self.assertEqual(sr.frequency, frequency)
        self.assertEqual(sr.duration, duration)

    def test_discrete_samples_11025(self):
        sr = SR11025()
        ts = ArrayWithUnits(
                np.zeros(sr.samples_per_second), [TimeDimension(*sr)])
        hl = HalfLapped()
        freq, duration = hl.discrete_samples(ts)
        self.assertEqual(256, freq)
        self.assertEqual(512, duration)

    def test_discrete_samples_22050(self):
        sr = SR22050()
        ts = ArrayWithUnits(
                np.zeros(sr.samples_per_second), [TimeDimension(*sr)])
        hl = HalfLapped()
        freq, duration = hl.discrete_samples(ts)
        self.assertEqual(512, freq)
        self.assertEqual(1024, duration)

    def test_discrete_samples_44100(self):
        sr = SR44100()
        ts = ArrayWithUnits(
                np.zeros(sr.samples_per_second), [TimeDimension(*sr)])
        hl = HalfLapped()
        freq, duration = hl.discrete_samples(ts)
        self.assertEqual(1024, freq)
        self.assertEqual(2048, duration)

    def test_nyquist_22050(self):
        self.assertEqual(11025, SR22050().nyquist)

    def test_nyquist_44100(self):
        self.assertEqual(22050, SR44100().nyquist)

    def test_can_convert_to_int(self):
        self.assertEqual(22050, int(SR22050()))

    def test_raises_for_unknown_audio_samplerate(self):
        self.assertRaises(ValueError, lambda: audio_sample_rate(1))

    def test_sr_96000_frequency(self):
        self.assertEqual(96000, SR96000().samples_per_second)

    def test_get_96000_frequency(self):
        self.assertIsInstance(audio_sample_rate(96000), SR96000)

    def test_sr_48000_frequency(self):
        self.assertEqual(48000, SR48000().samples_per_second)

    def test_get_48000_frequency(self):
        self.assertIsInstance(audio_sample_rate(48000), SR48000)

    def test_sr_44100_frequency(self):
        self.assertEqual(44100, SR44100().samples_per_second)

    def test_get_44100_frequency(self):
        self.assertIsInstance(audio_sample_rate(44100), SR44100)

    def test_sr_22050_frequency(self):
        self.assertEqual(22050, SR22050().samples_per_second)

    def test_get_22050_freuency(self):
        self.assertIsInstance(audio_sample_rate(22050), SR22050)

    def test_sr_11025_frequency(self):
        self.assertEqual(11025, SR11025().samples_per_second)

    def test_get_11025_frequency(self):
        self.assertIsInstance(audio_sample_rate(11025), SR11025)

    def test_no_overlap(self):
        self.assertEqual(Seconds(0), SampleRate(Seconds(1), Seconds(1)).overlap)

    def test_some_overlap(self):
        self.assertEqual(Seconds(1), SampleRate(Seconds(1), Seconds(2)).overlap)

    def test_multiply_no_overlap_number(self):
        sr = SampleRate(Seconds(1), Seconds(1)) * 2
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(2), sr.duration)

    def test_multiply_some_overlap_number(self):
        sr = SampleRate(Seconds(1), Seconds(2)) * 2
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(3), sr.duration)

    def test_multiply_no_overlap_single_value(self):
        sr = SampleRate(Seconds(1), Seconds(1)) * (2,)
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(2), sr.duration)

    def test_multiply_some_overlap_single_value(self):
        sr = SampleRate(Seconds(1), Seconds(2)) * (2,)
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(3), sr.duration)

    def test_multiply_no_overlap_two_values(self):
        sr = SampleRate(Seconds(1), Seconds(1)) * (2, 4)
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(4), sr.duration)

    def test_multiply_some_overlap_two_values(self):
        sr = SampleRate(Seconds(1), Seconds(2)) * (2, 4)
        self.assertEqual(Seconds(2), sr.frequency)
        self.assertEqual(Seconds(5), sr.duration)
