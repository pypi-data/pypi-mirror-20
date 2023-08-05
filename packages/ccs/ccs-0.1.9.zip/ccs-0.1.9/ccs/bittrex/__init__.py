# -*- coding: utf8 -*-

"""
This file implementns:

* class adapter which offer unificated API for requests ticker, trades, orderbook, ...

* class for symbol
"""

__author__ = "Jan Seda"
__copyright__ = "Copyright (C) Jan Seda"
__credits__ = []
__license__ = ""
__version__ = "0.1"
__maintainer__ = "Jan Seda"
__email__ = ""
__status__ = "Production"

import json

from . import public
from .. import abstract

# "btc-ltc"

##################################################################################
# SYMBOL                                                                         #
##################################################################################

class Symbol(abstract.Symbol):
    def __init__(self, base, quote):
        self._base  = Currency(base)
        self._quote = Currency(quote)


    def native(self):
        return self.base().native() + "-" + self.quote().native()

    @staticmethod
    def split(basequote):
        r = basequote.strip().split("-")
        b = r[0]
        q = r[1]
        return Symbol(b, q)


##################################################################################
# CURRENCY                                                                       #
##################################################################################

class Currency(abstract.Currency):
    def native(self):
        return self.c.strip().upper()


##################################################################################
# ADAPTER                                                                        #
##################################################################################


class Adapter(abstract.Adapter):
    @staticmethod
    def ticker(cur1, cur2):
        symbol = Symbol(cur1, cur2)
        s = symbol.native()
        return public.response.Ticker(public.getMarketSummary(s), symbol)

    @staticmethod
    def trades(cur1, cur2, limit=None, direction=None):
        symbol = Symbol(cur1, cur2)
        s = symbol.native()
        return public.response.Trades(public.getMarketHistory(s), symbol)

    @staticmethod
    def orderbook(cur1, cur2, limit=None):
        symbol = Symbol(cur1, cur2)
        s = symbol.native()
        return public.response.OrderBook(public.getOrderbook(s), symbol)

    @staticmethod
    def symbols():
        markets = json.loads(public.getMarkets())["result"]
        r = []

        for m in markets:
            # r.append(Symbol(m["BaseCurrency"], m["MarketCurrency"]))
            r.append(Symbol.split(m["MarketName"]))
        return r

    # TODO predelat- pouzededit z abstract. Viz abstract.Adapter
    @staticmethod
    def currencies():
        symbols = Adapter.symbols()
        r = []

        for s in symbols:
            r.append(s.base())
            r.append(s.quote())

        return set(r)
