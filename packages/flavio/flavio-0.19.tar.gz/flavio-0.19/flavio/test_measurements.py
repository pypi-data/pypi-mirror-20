import unittest
import numpy as np
from .measurements import *
from .classes import *


class TestMeasurements(unittest.TestCase):
    def test_measurements(self):
        m = Measurement.get_instance('Belle phigamma 2014')
        self.assertEqual(m.experiment, 'Belle')
