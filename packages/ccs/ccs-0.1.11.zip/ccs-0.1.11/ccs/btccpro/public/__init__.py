# -*- coding: utf8 -*-

"""
This file implements functions for reading informations from Btcc-spot public REST endpoints.
"""

__author__ = "Jan Seda"
__copyright__ = "Copyright (C) Jan Seda"
__credits__ = []
__license__ = ""
__version__ = "0.1"
__maintainer__ = "Jan Seda"
__email__ = ""
__status__ = "Production"


import urllib.parse
import sys

from ... import core
from ... import constants
from . import response

##################################################################################
# TICKER                                                                         #
##################################################################################

def ticker(symbol="XBTCNY"):
    """
        This function provide detailed data of give market. This informations offer high level overview of the current states on the market. It is actual price, best bids and asks etc.

        :param String market:
                Symbol is currency pair.

        :return:
                The function return payload of http response. It is string which contains json object. Official description of keys is in the table.

                =================== =============== ===================================================
                Key                 Value           Description
                =================== =============== ===================================================
                BidPrice            Double          bid price
                AskPrice            Double          ask pric
                Open                Double          open price
                High                Double          the highest trade price in 24 hours
                Low                 Double          the lowest trade price in 24 hours
                Last                Double          last price
                LastQuantity        Double          last quantity
                PrevCls             Double          close Price
                Timestamp           UTCTimestamp    timestamp
                ExecutionLimitDown  Double          limit Down
                ExecutionLimitUp    Double          limit Up
                =================== =============== ===================================================

        :rtype:
                String

        :exception:
                It can raise any exception which can occur during using

                * :py:class:`http.client.HTTPSConnection`

                * :py:func:`http.client.HTTPSConnection.request`.

        :Example:
                >>> import ccs
                >>> response = ccs.btccpro.public.ticker("XBTCNY")
                >>> print(response)
                {
                    "ticker":
                            {
                                "BidPrice":5553.5,
                                "AskPrice":5571,
                                "Open":5509.58,
                                "High":5610,
                                "Low":5450,
                                "Last":5571,
                                "LastQuantity":1,
                                "PrevCls":5581.9,
                                "Volume":2237,
                                "Volume24H":5200,
                                "Timestamp":1484478727152,
                                "ExecutionLimitDown":5408.8,
                                "ExecutionLimitUp":5743.4
                            }
                }
                >>>
                >>> # Prepared validation schema
                >>> schema = ccs.cfg.schema[ccs.constants.BTCCPRO]["ticker"]


        .. note::
                This function use REST endpoint which is described on `Btcc-pro Ticker documentation <https://www.btcc.com/apidocs/pro-exchange-market-data-rest-api#ticker>`_.

                Example of GET request:

                * https://pro-data.btcc.com/data/pro/ticker?symbol=XBTCNY
    """
    s = __name__.split(".")[1]  # stock name
    r = sys._getframe().f_code.co_name  # request name is same as name of function

    params = {}
    params["symbol"] = symbol

    # complete request
    cr = core.request(s, r) + urllib.parse.urlencode(params)

    return core.get(core.hostname(s), cr, core.header(s), core.compression(s), core.timeout(s))


##################################################################################
# TRADE HISTORY                                                                  #
##################################################################################

def tradeHistory(symbol="XBTCNY", limit=100, since=None, sincetype=None):
    """
        This function provide history of trades.

        :param String symbol:
                Symbol is currency pair.

        :param Integer limit:
                It define maximum number of trades. This argument must be greater or equal to 1. This argument is optional. Default value is 100. Maximum is 5000.

        :param Integer since:
                 Setting this argument cause showing trades at or after the timestamp or tid. This argument is optional.

        :param Integer sincetype:
                 Available values for this argument are “id” or “time”. It specifies on which data the “since” parameter works. The default value is “id”.


        :return:
                The function return payload of http response. It is string which contains json object. Official description of keys is in the table.

                =================== =============== ===================================================
                Key                 Value           Description
                =================== =============== ===================================================
                Id                  String          trade id.
                Timestamp           UTCTimestamp    Unix time in seconds since 1 January 1970.
                Price               Double          trade price
                Quantity            Double          trade quantity
                Side                Char            sell or buy
                =================== =============== ===================================================

        :rtype:
                String

        :exception:
                It can raise any exception which can occur during using

                * :py:class:`http.client.HTTPSConnection`

                * :py:func:`http.client.HTTPSConnection.request`.

        :Example:
                >>> import ccs
                >>> response = ccs.btccpro.public.tradeHistory("XBTCNY")
                >>> print(response)
                [
                    {
                        "Id": 19,
                        "Timestamp": 1456757388489,
                        "Price": 2538,
                        "Quantity": 2,
                        "Side": "Sell"
                    },
                    ...
                ]
                >>>
                >>> # Other examples of using
                >>> ccs.btccpro.public.tradeHistory("ltccny", limit=10)
                >>> ccs.btccpro.public.tradeHistory("ltccny", since=7000)
                >>> ccs.btccpro.public.tradeHistory("ltccny", since=1484396000, sincetype="time")
                >>> ccs.btccpro.public.tradeHistory("ltccny", 10, 1484396000, "time")
                >>>
                >>> # Prepared validation schema
                >>> schema = ccs.cfg.schema[ccs.constants.BTCCPRO]["tradeHistory"]


        .. note::
                This function use REST endpoint which is described on `Btcc-pro Trade History documentation <https://www.btcc.com/apidocs/pro-exchange-market-data-rest-api#trade-history>`_.

                Example of GET request:

                * https://pro-data.btcc.com/data/pro/historydata?symbol=XBTCNY

                * https://pro-data.btcc.com/data/pro/historydata?limit=100&symbol=XBTCNY

                * https://pro-data.btcc.com/data/pro/historydata?since=10&symbol=XBTCNY

                * https://pro-data.btcc.com/data/pro/historydata?since=10&limit=10&symbol=XBTCNY

                * https://pro-data.btcc.com/data/pro/historydata?since=1456757387645&limit=10&sincetype=time&symbol=XBTCNY
    """
    s = __name__.split(".")[1]  # stock name
    r = sys._getframe().f_code.co_name  # request name is same as name of function

    params = {}
    params["symbol"] = symbol

    if limit:
        params["limit"] = limit

    if since:
        params["since"] = since

    if sincetype:
        params["sincetype"] = sincetype

    # complete request
    cr = core.request(s, r) + urllib.parse.urlencode(params)

    return core.get(core.hostname(s), cr, core.header(s), core.compression(s), core.timeout(s))


##################################################################################
# ORDERBOOK                                                                      #
##################################################################################

def orderbook(symbol="XBTCNY", limit=None):
    """
        This function provide lists of orders for sell and buy.

        :param String symbol:
                Symbol is currency pair.

        :param Integer limit:
                It define maximum number of asks and bids. This argument is optional.

        :return:
                The function return payload of http response. It is string which contains json object. Official description of keys is in the table.

                =================== =============== ===================================================
                Key                 Value           Description
                =================== =============== ===================================================
                asks	            array
                bids	            array
                date	            number	        last update timestamp
                =================== =============== ===================================================

                Each item in arrays for asks and bids describe one order. Official description of array position is in the table.

                ========= =========================
                Position  Description
                ========= =========================
                0         price
                1         volume
                ========= =========================

        :rtype:
                String

        :exception:
                It can raise any exception which can occur during using

                * :py:class:`http.client.HTTPSConnection`

                * :py:func:`http.client.HTTPSConnection.request`.

        :Example:
                >>> import ccs
                >>> response = ccs.btccpro.public.orderbook("XBTCNY")
                >>> print(response)
                {
                    "asks":
                            [
                                [5721.48,0.8],
                                [5721.4,0.71],
                                ...
                            ],
                    "bids":
                            [
                                [5721,0.6097],
                                [5720.67,0.1],
                                ...
                            ],
                    "date":1484398991
                }
                >>>
                >>> # Prepared validation schema
                >>> schema = ccs.cfg.schema[ccs.constants.BTCCPRO]["orderbook"]


        .. note::
                This function use REST endpoint which is described on `Btcc-pro orderbook documentation <https://www.btcc.com/apidocs/pro-exchange-market-data-rest-api#order-book>`_.

                Example of GET request:

                * https://pro-data.btcc.com/data/pro/orderbook?symbol=XBTCNY

                * https://pro-data.btcc.com/data/pro/orderbook?limit=5&symbol=XBTCNY
    """

    s = __name__.split(".")[1]  # stock name
    r = sys._getframe().f_code.co_name  # request name is same as name of function

    params = {}
    params["symbol"] = symbol

    if limit:
        params["limit"] = limit

    # complete request
    cr = core.request(s, r) + urllib.parse.urlencode(params)

    return core.get(core.hostname(s), cr, core.header(s), core.compression(s), core.timeout(s))

