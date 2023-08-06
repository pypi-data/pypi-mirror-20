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
"""

from decimal import Decimal
from decimal import InvalidOperation

from unitbase import UnitBase
from unitbase import NumericalUnitBase
from unitbase import Percentage
from unitbase import GainBase
from unitbase import parse_none


def parse_resistance(value):
    num_val = Decimal(value[:-1])
    ostr = value[-1:]
    if ostr == 'm':
        return num_val / 1000
    elif ostr == 'E':
        return num_val
    elif ostr == 'K':
        return num_val * 1000
    elif ostr == 'M':
        return num_val * 1000000
    elif ostr == 'G':
        return num_val * 1000000000


def parse_capacitance(value):
    value = value.strip()

    try:
        num_val = Decimal(value[:-1])
        ostr = value[-1:]
    except InvalidOperation:
        num_val = Decimal(value[:-2])
        ostr = value[-2:]

    if ostr == 'F':
        return num_val
    elif ostr == 'mF':
        return num_val / 1000
    elif ostr == 'uF':
        return num_val / 1000000
    elif ostr == 'nF':
        return num_val / 1000000000
    elif ostr == 'pF':
        return num_val / 1000000000000
    elif ostr == 'fF':
        return num_val / 1000000000000000
    else:
        raise ValueError


def parse_inductance(value):
    value = value.strip()

    try:
        num_val = Decimal(value[:-1])
        ostr = value[-1:]
    except InvalidOperation:
        num_val = Decimal(value[:-2])
        ostr = value[-2:]

    if ostr == 'H':
        return num_val
    elif ostr == 'mH':
        return num_val / 1000
    elif ostr == 'uH':
        return num_val / 1000000
    elif ostr == 'nH':
        return num_val / 1000000000
    elif ostr == 'pH':
        return num_val / 1000000000000
    else:
        raise ValueError


def parse_voltage(value):
    value = value.strip()

    try:
        num_val = Decimal(value[:-1])
        ostr = value[-1:]
    except InvalidOperation:
        num_val = Decimal(value[:-2])
        ostr = value[-2:]

    if ostr == 'V':
        return num_val
    elif ostr == 'mV':
        return num_val / 1000
    elif ostr == 'uV':
        return num_val / 1000000
    elif ostr == 'nV':
        return num_val / 1000000000
    elif ostr == 'pV':
        return num_val / 1000000000000
    elif ostr == 'kV':
        return num_val * 1000
    else:
        raise ValueError


def parse_charge(value):
    value = value.strip()

    try:
        num_val = Decimal(value[:-1])
        ostr = value[-1:]
    except InvalidOperation:
        num_val = Decimal(value[:-2])
        ostr = value[-2:]

    if ostr == 'C':
        return num_val
    elif ostr == 'mC':
        return num_val / 1000
    elif ostr == 'uC':
        return num_val / 1000000
    elif ostr == 'nC':
        return num_val / 1000000000
    elif ostr == 'pC':
        return num_val / 1000000000000
    elif ostr == 'fC':
        return num_val / 1000000000000000
    else:
        raise ValueError


def parse_current(value):
    value = value.strip()
    try:
        num_val = Decimal(value[:-1])
        ostr = value[-1:]
    except InvalidOperation:
        num_val = Decimal(value[:-2])
        ostr = value[-2:]

    if ostr == 'A':
        return num_val
    elif ostr == 'mA':
        return num_val / 1000
    elif ostr == 'uA':
        return num_val / 1000000
    elif ostr == 'nA':
        return num_val / 1000000000
    elif ostr == 'pA':
        return num_val / 1000000000000
    elif ostr == 'fA':
        return num_val / 1000000000000000
    else:
        raise ValueError


def parse_dbm(value):
    num_val = Decimal(value[:-3])
    ostr = value[-3:]
    if ostr == 'dBm':
        return num_val


def parse_hfe(value):
    num_val = Decimal(value[:-3])
    ostr = value[-3:]
    if ostr == 'HFE':
        return num_val


class Resistance(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['m', 'E', 'K', 'M']
        _dostr = 'E'
        _parse_func = parse_resistance
        super(Resistance, self).__init__(value, _ostrs, _dostr, _parse_func)


class Capacitance(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['pF', 'nF', 'uF', 'mF', 'F']
        _dostr = 'F'
        _parse_func = parse_capacitance
        super(Capacitance, self).__init__(value, _ostrs, _dostr, _parse_func)


class Inductance(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['pH', 'nH', 'uH', 'mH', 'H']
        _dostr = 'H'
        _parse_func = parse_inductance
        super(Inductance, self).__init__(value, _ostrs, _dostr, _parse_func)


class Voltage(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['pV', 'nV', 'uV', 'mV', 'V', 'kV']
        _dostr = 'V'
        _parse_func = parse_voltage
        super(Voltage, self).__init__(value, _ostrs, _dostr, _parse_func)


class VoltageAC(Voltage):
    pass


class VoltageDC(Voltage):
    pass


class DiodeVoltageDC(VoltageDC):
    pass


class Current(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['fA', 'pA', 'nA', 'uA', 'mA', 'A']
        _dostr = 'A'
        _parse_func = parse_current
        super(Current, self).__init__(value, _ostrs, _dostr, _parse_func)


class CurrentAC(Current):
    pass


class CurrentDC(Current):
    pass


class Charge(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['fC', 'pC', 'nC', 'uC', 'mC', 'C']
        _dostr = 'C'
        _parse_func = parse_charge
        super(Charge, self).__init__(value, _ostrs, _dostr, _parse_func)


def parse_voltage_gain(value):
    try:
        return Decimal(value)
    except InvalidOperation:
        if value.endswith('V/V'):
            return Decimal(value[:-3])
        elif value.endswith('dB'):
            v = Decimal(value[:-2])
            return 10 ** (v/20)
        else:
            raise ValueError(
                "Unrecognized string for VoltageGain : " + value
            )


class VoltageGain(GainBase):
    def __init__(self, value):
        _gtype = Voltage
        _ostrs = ['V/V']
        _dostr = 'V/V'
        _parse_func = parse_voltage_gain
        super(VoltageGain, self).__init__(
            value, _ostrs, _dostr, _parse_func, _gtype
        )


class PowerRatio(NumericalUnitBase):
    def __init__(self, value):
        _ostrs = ['dBm']
        _dostr = 'dBm'
        _parse_func = parse_dbm
        super(PowerRatio, self).__init__(value, _ostrs, _dostr, _parse_func)

    def __repr__(self):
        return str(self._value) + self._dostr


class HFE(UnitBase):
    def __init__(self, value):
        _dostr = 'HFE'
        _parse_func = parse_hfe
        super(HFE, self).__init__(value, _dostr, _parse_func)

    def __repr__(self):
        return str(self._value) + self._dostr


class Continuity(UnitBase):
    def __init__(self, value):
        _dostr = None
        _parse_func = parse_none
        super(Continuity, self).__init__(value, _dostr, _parse_func)

    def __repr__(self):
        return str(self._value)


class DutyCycle(Percentage):
    pass
