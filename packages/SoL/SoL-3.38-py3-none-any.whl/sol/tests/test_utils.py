# -*- coding: utf-8 -*-
# :Project:   SoL
# :Created:   lun 13 ott 2008 10:38:18 CEST
# :Author:    Lele Gaifax <lele@metapensiero.it>
# :License:   GNU General Public License version 3 or later
# :Copyright: © 2008, 2009, 2010, 2013, 2014, 2016 Lele Gaifax
#

from sol import get_ip_address, models
from sol.models.utils import (entity_from_primary_key, njoin, normalize,
                              table_from_primary_key)
from . import TestCase


class TestUtilityFunctions(TestCase):

    def test_njoin(self):
        self.assertEqual(njoin(['a', 'b', 'c']), 'a, b and c')
        self.assertEqual(njoin([1, 2]), '1 and 2')
        self.assertEqual(njoin(['a']), 'a')

    def test_normalize(self):
        self.assertIs(normalize(None), None)
        self.assertEqual(normalize('lele'), 'Lele')
        self.assertEqual(normalize('LELE'), 'Lele')
        self.assertEqual(normalize('LeLe'), 'LeLe')
        self.assertEqual(normalize('LeLe', True), 'Lele')
        self.assertEqual(normalize('lele', False), 'lele')
        self.assertEqual(normalize(' le   le '), 'Le Le')

    def test_efpk(self):
        self.assertIs(entity_from_primary_key('idplayer'), models.Player)
        try:
            entity_from_primary_key('dummy')
        except:
            pass
        else:
            assert False, 'Should raise an non existing PK error!'

    def test_tfpk(self):
        self.assertIs(table_from_primary_key('idclub'), models.Club.__table__)
        try:
            table_from_primary_key('dummy')
        except:
            pass
        else:
            assert False, 'Should raise an non existing PK error!'

    def test_get_ip_address(self):
        self.assertIsNotNone(get_ip_address())
