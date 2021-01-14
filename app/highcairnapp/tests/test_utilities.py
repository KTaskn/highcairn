import unittest
from utilities import Resizer

class ResizerTestCase(unittest.TestCase):
    def setUp(self):
        self.resizer = Resizer(600, 600)

    def test_calc_under_both(self):
        # どちらも以下ならそのまま
        self.assertEqual(self.resizer.calc(600, 600), (600, 600))

    def test_calc_over_width(self):
        # widthが倍なら、heightもwidthも半分
        self.assertEqual(self.resizer.calc(1200, 600), (600, 300))
    
    def test_calc_over_height(self):
        # heightが倍なら、widthもheightも半分
        self.assertEqual(self.resizer.calc(600, 1200), (300, 600))

    def test_calc_over_width_x4(self):
        # widthが大きいから、widthにあわせてリサイズ
        self.assertEqual(self.resizer.calc(1200, 2400), (300, 600))
    
    def test_calc_over_height_x4(self):
        # heightが大きいから、heightにあわせてリサイズ
        self.assertEqual(self.resizer.calc(2400, 1200), (600, 300))