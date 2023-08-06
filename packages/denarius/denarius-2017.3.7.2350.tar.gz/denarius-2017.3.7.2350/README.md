# denarius

currency and other utilities

# setup

```Bash
sudo apt-get install sqlite
sudo pip install denarius
```

# Bitcoin values

![](images/2010_07_17--2017_01_20_Bitcoin_EUR.png)

![](images/2016-12--2017-01_Bitcoin_EUR.png)

The function `ticker_Bitcoin` returns data of the following form:

```Python
{'volume': 2050.1665002833397, 'last': 992.2553834529656, 'timestamp': 1487551580.0, 'bid': 991.8303740083114, 'vwap': 993.3415187004156, 'high': 1002.9278428409522, 'low': 981.3656970154892, 'ask': 992.2553834529656, 'open': 993.3887419720438}
```

It accesses data from Bitstamp.

|**feature**|**description**                            |
|-----------|-------------------------------------------|
|last       |last Bitcoin price                         |
|high       |last 24 hours price high                   |
|low        |last 24 hours price low                    |
|vwap       |last 24 hours volume weighted average price|
|volume     |last 24 hours volume                       |
|bid        |highest buy order                          |
|ask        |lowest sell order                          |
|timestamp  |UNIX timestamp date and time               |
|open       |first price of the day                     |

The function `data_historical_Bitcoin` returns by default data of the following form:

```Python
{'bpi': {'2017-02-17': 992.1077, '2017-02-16': 969.2414, '2017-02-15': 952.6512, '2017-02-14': 954.1432, '2017-02-13': 940.7982, '2017-02-12': 940.1764, '2017-02-11': 949.3397, '2017-02-10': 933.4325, '2017-02-19': 991.254, '2017-02-18': 997.0854}, 'time': {'updated': 'Feb 20, 2017 00:20:08 UTC', 'updatedISO': '2017-02-20T00:20:08+00:00'}, 'disclaimer': 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as EUR.'}
```

With the option `return_list`, it returns data of the following form:

```Python
[['2017-02-10', 933.4325], ['2017-02-11', 949.3397], ['2017-02-12', 940.1764], ['2017-02-13', 940.7982], ['2017-02-14', 954.1432], ['2017-02-15', 952.6512], ['2017-02-16', 969.2414], ['2017-02-17', 992.1077], ['2017-02-18', 997.0854], ['2017-02-19', 991.254]]
```

With the option `return_UNIX_times`, it returns data of the following form:

```Python
[[1486684800, 933.4325], [1486771200, 949.3397], [1486857600, 940.1764], [1486944000, 940.7982], [1487030400, 954.1432], [1487116800, 952.6512], [1487203200, 969.2414], [1487289600, 992.1077], [1487376000, 997.0854], [1487462400, 991.254]]
```

# LocalBitcoins

LocalBitcoins data is available via its API. For example, the following URL gives data on current trades in GBP available by national bank transfer:

- <https://localbitcoins.com/buy-bitcoins-online/GB/united-kingdom/national-bank-transfer/.json>

The data returned is of a form [like this](data/2017-03-07T2249Z.txt).

The function `values_Bitcoin_LocalBitcoin` returns the price values returned by calling the API in this way.

```Python
import denarius
denarius.values_Bitcoin_LocalBitcoin()
```

# databases

A database of Bitcoin values can be saved in the following way:

```Python
import denarius
denarius.save_database_Bitcoin(filename = "database.db")
```

# denarius_graph_Bitcoin

The script `denarius_graph_Bitcoin.py` displays a PyQt GUI with a graph of the last Bitcoin values.

```Bash
denarius_graph_Bitcoin.py --help
```

```Bash
denarius_graph_Bitcoin.py
```

```Bash
denarius_graph_Bitcoin.py --currency=EUR --days=100
```

![](images/denarius_graph_Bitcoin.png)
