#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Hua Liang[Stupid ET] <et@everet.org>
#

import numpy as np
import talib

from .utils import FormulaException
from .time_series import PriceSeries, NumericSeries, BoolSeries, fit_series


class OneArgumentSeries(NumericSeries):
    func = talib.MA

    def __init__(self, series, arg):
        if isinstance(series, NumericSeries):
            series = series.series
            series[series == np.inf] = np.nan
            try:
                series = self.func(series, arg)
            except Exception as e:
                raise FormulaException(e)
        super(OneArgumentSeries, self).__init__(series)
        self.extra_create_kwargs["arg"] = arg


class MovingAverageSeries(OneArgumentSeries):
    """http://www.tadoc.org/indicator/MA.htm"""
    func = talib.MA


class WeightedMovingAverageSeries(OneArgumentSeries):
    """http://www.tadoc.org/indicator/WMA.htm"""
    func = talib.WMA


class ExponentialMovingAverageSeries(OneArgumentSeries):
    """http://www.fmlabs.com/reference/default.htm?url=ExpMA.htm"""
    func = talib.EMA


class SumSeries(NumericSeries):
    """求和"""
    def __init__(self, series, period):
        if isinstance(series, NumericSeries):
            series = series.series
            try:
                series[series == np.inf] = 0
                series[series == -np.inf] = 0
                series = talib.SUM(series, period)
            except Exception as e:
                raise FormulaException(e)
        super(SumSeries, self).__init__(series)
        self.extra_create_kwargs["period"] = period


class AbsSeries(NumericSeries):
    def __init__(self, series):
        if isinstance(series, NumericSeries):
            series = series.series
            try:
                series[series == np.inf] = 0
                series[series == -np.inf] = 0
                series = np.abs(series)
            except Exception as e:
                raise FormulaException(e)
        super(AbsSeries, self).__init__(series)


def CrossOver(s1, s2):
    """s1金叉s2
    :param s1:
    :param s2:
    :returns: bool序列
    :rtype: BoolSeries
    """
    series1, series2 = fit_series(s1.series, s2.series)
    cond1 = series1 > series2
    series1, series2 = fit_series(s1[1].series, s2[1].series)
    cond2 = series1 <= series2  # s1[1].series <= s2[1].series
    cond1, cond2 = fit_series(cond1, cond2)
    s = cond1 & cond2
    return BoolSeries(s)


def Ref(s1, n):
    return s1[n]


def minimum(s1, s2):
    if len(s1) == 0 or len(s2) == 0:
        raise FormulaException("minimum size == 0")
    s = np.minimum(s1.series, s2.series)
    return NumericSeries(s)


def maximum(s1, s2):
    if len(s1) == 0 or len(s2) == 0:
        raise FormulaException("maximum size == 0")
    s = np.maximum(s1.series, s2.series)
    return NumericSeries(s)


def count(cond, n):
    # TODO lazy compute
    series = cond.series
    size = len(cond.series) - n
    try:
        result = np.full(size, 0, dtype=np.int)
    except ValueError as e:
        raise FormulaException(e)
    for i in range(size - 1, 0, -1):
        s = series[-n:]
        result[i] = len(s[s == True])
        series = series[:-1]
    return NumericSeries(result)


def every(cond, n):
    return count(cond, n) == n


def hhv(s, n):
    # TODO lazy compute
    series = s.series
    size = len(s.series) - n
    try:
        result = np.full(size, 0, dtype=np.float64)
    except ValueError as e:
        raise FormulaException(e)
    for i in range(size - 1, 0, -1):
        s = series[-n:]
        result[i] = s.max()
        series = series[:-1]
    return NumericSeries(result)


def llv(s, n):
    # TODO lazy compute
    series = s.series
    size = len(s.series) - n
    try:
        result = np.full(size, 0, dtype=np.float64)
    except ValueError as e:
        raise FormulaException(e)
    for i in range(size - 1, 0, -1):
        s = series[-n:]
        result[i] = s.min()
        series = series[:-1]
    return NumericSeries(result)


# FIXME bug
# def iif(condition, true_statement, false_statement):
#     return true_statement if condition else false_statement
