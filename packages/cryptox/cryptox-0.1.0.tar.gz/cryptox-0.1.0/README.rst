# **CryptoX**

Python3 library for working with various cryptocurrency exchanges.


##### THROWING THIS IN README UNTIL DOCUMENTATION IS CREATED
##### returns list of currency pairs with positive 24_hour_volume
##### optional: exchange param.  Valid exchanges are 'ccex','poloniex' or 'all'.
##### default param is 'all' if no exchange selecteds 
##### currency_pairs = mk.get_currency_pairs()
##### print(currency_pairs)

##### returns list of bids/asks for a given exchange and currency pair.
##### will error out if passed an incorrect currency pair for the given exchange (not handled)
##### max depth set to 100 even if number >100 entered
##### order_book = mk.order_book(depth=10)
##### print(order_book)

##### returns list of trade history for a given exchange and currency pair.
##### will error out if passed an incorrect currency pair for the given exchange (not handled)
##### max depth set to 100 even if number >100 entered
##### trade_history = mk.trade_history(depth=10)
##### print(trade_history)