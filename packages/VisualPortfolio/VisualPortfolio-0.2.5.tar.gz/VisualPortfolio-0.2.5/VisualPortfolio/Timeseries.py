# -*- coding: utf-8 -*-
u"""
Created on 2015-11-9

@author: cheng.li
"""

import numpy as np
import pandas as pd
import datetime as dt
from math import sqrt
from math import exp
from PyFin.Math.Accumulators import MovingDrawDown
from PyFin.Math.Accumulators import MovingAlphaBeta
from PyFin.Math.Accumulators import MovingSharp

APPROX_BDAYS_PER_MONTH = 21
APPROX_BDAYS_PER_YEAR = 252.


def aggregatePositons(positionBooks, convert='daily'):

    if convert == 'daily':
        resampled_pos = positionBooks.groupby(
            lambda x: dt.datetime(x.year, x.month, x.day)).last()
    elif convert == 'raw':
        resampled_pos = positionBooks.copy()

    return resampled_pos


def aggregateTranscations(transcations, convert='daily'):
    transcations = transcations[['turnover_volume', 'turnover_value']].abs()
    if convert == 'daily':
        resampled_pos = transcations.groupby(
            lambda x: dt.datetime(x.year, x.month, x.day)).sum()

    return resampled_pos


def calculatePosWeight(pos):

    if 'cash' in pos:
        pos_wo_cash = pos.drop('cash', axis=1)
        cash = pos.cash
    else:
        pos_wo_cash = pos
        cash = 0.

    longs = pos_wo_cash[pos_wo_cash > 0].sum(axis=1).fillna(0)
    shorts = pos_wo_cash[pos_wo_cash < 0].abs().sum(axis=1).fillna(0)

    net_liquidation = longs + shorts + cash

    return pos.divide(
        net_liquidation,
        axis='index'
    ).fillna(0.)


def aggregateReturns(returns, turn_over=None, tc_cost=0., convert='daily'):

    def cumulateReturns(x):
        return x.sum()

    if turn_over is not None:
        returns_after_tc = returns.sub(turn_over * tc_cost, fill_value=0.).dropna()

        if convert == 'daily':
            return returns.groupby(
                lambda x: dt.datetime(x.year, x.month, x.day)).apply(cumulateReturns), \
                   returns_after_tc.groupby(
                lambda x: dt.datetime(x.year, x.month, x.day)).apply(cumulateReturns)
        if convert == 'monthly':
            return returns.groupby(
                [lambda x: x.year,
                 lambda x: x.month]).apply(cumulateReturns), \
                   returns_after_tc.groupby(
                [lambda x: x.year,
                 lambda x: x.month]).apply(cumulateReturns)
        if convert == 'yearly':
            return returns.groupby(
                [lambda x: x.year]).apply(cumulateReturns), \
                   returns_after_tc.groupby(
                [lambda x: x.year]).apply(cumulateReturns)
        else:
            ValueError('convert must be daily, weekly, monthly or yearly')
    else:
        if convert == 'daily':
            return returns.groupby(
                lambda x: dt.datetime(x.year, x.month, x.day)).apply(cumulateReturns), None
        if convert == 'monthly':
            return returns.groupby(
                [lambda x: x.year,
                 lambda x: x.month]).apply(cumulateReturns), None
        if convert == 'yearly':
            return returns.groupby(
                [lambda x: x.year]).apply(cumulateReturns), None
        else:
            ValueError('convert must be daily, weekly, monthly or yearly')


def drawDown(returns):

    ddCal = MovingDrawDown(len(returns), 'ret')
    length = len(returns)
    ddSeries = [0.0] * length
    peakSeries = [0] * length
    valleySeries = [0] * length
    recoverySeries = [returns.index[-1]] * length
    for i, value in enumerate(returns):
        ddCal.push({'ret': value})
        res = ddCal.value
        ddSeries[i] = exp(res[0]) - 1.0
        peakSeries[i] = returns.index[res[2]]
        valleySeries[i] = returns.index[i]

    for i, value in enumerate(ddSeries):
        for k in range(i, length):
            if ddSeries[k] == 0.0:
                recoverySeries[i] = returns.index[k]
                break

    df = pd.DataFrame(list(zip(ddSeries, peakSeries, valleySeries, recoverySeries)),
                      index=returns.index,
                      columns=['draw_down', 'peak', 'valley', 'recovery'])
    return df


def annualReturn(returns):
    return returns.mean() * APPROX_BDAYS_PER_YEAR


def annualVolatility(returns):
    return returns.std() * sqrt(APPROX_BDAYS_PER_YEAR)


def sortinoRatio(returns):
    annualRet = annualReturn(returns)
    annualNegativeVol = annualVolatility(returns[returns < 0.0])
    if annualNegativeVol != 0.:
        return annualRet / annualNegativeVol
    else:
        return np.nan


def sharpRatio(returns):
    annualRet = annualReturn(returns)
    annualVol = annualVolatility(returns)

    if annualVol != 0.:
        return annualRet / annualVol
    else:
        return np.nan


def RollingBeta(returns, benchmarkReturns, month_windows, factor):

    def calculateSingalWindowBete(returns, benchmarkReturns, window):
        res = []
        rbcalc = MovingAlphaBeta(window=int(window * APPROX_BDAYS_PER_MONTH))
        for pRet, mRet in zip(returns, benchmarkReturns):
            rbcalc.push({'pRet': pRet, 'mRet': mRet, 'riskFree': 0})
            try:
                res.append(rbcalc.result()[1])
            except ZeroDivisionError:
                res.append(np.nan)
        return res

    rtn = [pd.Series(calculateSingalWindowBete(returns, benchmarkReturns, window / factor), index=returns.index)
           for window in month_windows]

    return {"beta_{0}m".format(window): res[int(APPROX_BDAYS_PER_MONTH*min(month_windows) / factor):] for window, res in zip(month_windows, rtn)}


def RollingSharp(returns, month_windows, factor):

    def calculateSingalWindowSharp(returns, window, factor):
        res = []
        rscalc = MovingSharp(window=int(window * APPROX_BDAYS_PER_MONTH))
        for ret in returns:
            rscalc.push({'ret': ret, 'riskFree': 0})
            try:
                # in PyFin, sharp is not annualized
                res.append(rscalc.result() * sqrt(APPROX_BDAYS_PER_YEAR / factor))
            except ZeroDivisionError:
                res.append(np.nan)
        return res

    rtn = [pd.Series(calculateSingalWindowSharp(returns, window / factor, factor), index=returns.index)
           for window in month_windows]

    return {"sharp_{0}m".format(window): res[int(APPROX_BDAYS_PER_MONTH*min(month_windows) / factor):] for window, res in zip(month_windows, rtn)}
