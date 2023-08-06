# Copyright (C) 2015 Chintalagiri Shashank
#
# This file is part of Tendril.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""
This file is part of tendril
See the COPYING, README, and INSTALL files for more information

This file needs to be refactored quite a bit
"""

from math import pi
import iec60063

from tendril.conventions.motifs.motifbase import MotifBase
from tendril.conventions import electronics
from tendril.gedaif import gsymlib

from tendril.utils import log
logger = log.get_logger(__name__, log.DEFAULT)


class MotifLPF1(MotifBase):
    def __init__(self, identifier):
        super(MotifLPF1, self).__init__(identifier)

    def configure(self, configdict):
        # Set Resistances
        self.get_elem_by_idx('R1').data['value'] = electronics.construct_resistor(configdict['R1'], '0.125W')  # noqa

        # Set Frequency
        self._configdict = configdict
        self.Fc = float(configdict['Fc'][:-2])
        self.validate()

    @property
    def Fc(self):
        return 1 / (2 * pi * float(self.R1) * float(self.C1))

    @Fc.setter
    def Fc(self, value):
        c1_dev = self.get_elem_by_idx('C1').data['device']
        c1_fp = self.get_elem_by_idx('C1').data['footprint']
        if c1_fp[0:3] == "MY-":
            c1_fp = c1_fp[3:]

        allowed_cap_vals = iec60063.gen_vals(self._configdict['Cseries'],
                                             iec60063.cap_ostrs,
                                             self._configdict['Cmin'],
                                             self._configdict['Cmax'])

        required_cap_val = 1 / (2 * pi * float(self.R1) * value)

        cval = None
        for val in allowed_cap_vals:
            lastval = cval
            cval = electronics.parse_capacitance(val)
            if cval >= required_cap_val:
                self.get_elem_by_idx('C1').data['value'] = gsymlib.find_capacitor(lastval, c1_fp, c1_dev).value  # noqa
                break

        if cval is None:
            raise ValueError

    @property
    def R1(self):
        elem = self.get_elem_by_idx('R1')
        assert elem.data['device'] in ['RES SMD', 'RES THRU']
        return electronics.parse_resistance(electronics.parse_resistor(elem.data['value'])[0])  # noqa

    @property
    def C1(self):
        elem = self.get_elem_by_idx('C1')
        assert elem.data['device'] in ['CAP CER SMD', 'CAP CER THRU']
        return electronics.parse_capacitance(electronics.parse_capacitor(elem.data['value'])[0])  # noqa

    def validate(self):
        pass

    def get_configdict_stub(self):
        stub = {'desc': "Simple Single Pole Low Pass Filter",
                'Fc': "15000Hz",
                'R1': "50E",
                'Cseries': "E6", 'Cmin': "1pF", 'Cmax': "1uF",
                }
        return stub

    @property
    def parameters_base(self):
        p_fc = [
            ('Fc', "Filter Cutoff Frequency", ''),
        ]
        parameters = [
            (p_fc, "Filter Parameters"),
        ]
        return parameters

    @property
    def configdict_base(self):
        inputs = [
            ('desc', "Simple Single Pole Low Pass Filter", 'description', str),
            ('Cseries', 'E6', 'Capacitance Series', str),
            ('Cmin', '1pF', 'Minimum Capacitance', str),
            ('Cmax', '100nF', 'Maximum Capacitance', str),
            ('Fc', "15000Hz", 'Filter Cutoff Frequency', str),
            ('R1', "50E", 'Input Resistance Value', str),
        ]
        return inputs
