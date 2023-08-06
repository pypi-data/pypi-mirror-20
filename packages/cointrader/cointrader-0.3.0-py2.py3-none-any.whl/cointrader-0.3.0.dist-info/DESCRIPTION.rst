===============================
Cointrader
===============================


.. image:: https://img.shields.io/pypi/v/cointrader.svg
        :target: https://pypi.python.org/pypi/cointrader

.. image:: https://img.shields.io/travis/toirl/cointrader.svg
        :target: https://travis-ci.org/toirl/cointrader

.. image:: https://api.codacy.com/project/badge/Grade/ef487c2c01d4491e91dec5b8490214ee
        :target: https://www.codacy.com/app/torsten/cointrader?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=toirl/cointrader&amp;utm_campaign=Badge_Grade

.. image:: https://readthedocs.org/projects/cointrader/badge/?version=latest
        :target: https://cointrader.readthedocs.io/en/latest/?badge=latest
        :alt: Documentation Status

.. image:: https://pyup.io/repos/github/toirl/cointrader/shield.svg
     :target: https://pyup.io/repos/github/toirl/cointrader/
     :alt: Updates


Cointrader is Python based CLI trading application for crypto currencies on
the Poloniex_ exchange.  Cointrader can be used for semiautomatic guided
trading.

* Status: Alpha
* Free software: MIT license
* Source: https://github.com/toirl/cointrader
* Documentation: https://cointrader.readthedocs.io.


Features
--------

* Explore exchange for interesting markets to trade on
* Show your balances
* Semiautomatic trading. Just emitting trading signals.
* Backtest capabilities

Planned
-------

* Risk- and Money management

 * Stop loss limits
 * Take profit limits

* Trade logbook, Profit/Loss analysis
* Full automatic trading
* Pluggable external trading strategies
* Support more exchanges

Motivation
----------
This program exists because I want to learn more about automatic trading
based on a technical analysis of charts.
I am no expert on trading or crypto currencies! I am a professional
Python programmer who stuck his nose into the crypto coin and trading world in
2017 and who was directly fascinated on this topic. After reading some books
on technical analysis I decided to write this program to learn more about
how automatic trading works.

Credits
---------

This package was created with Cookiecutter_ and the `audreyr/cookiecutter-pypackage`_ project template.

.. _Poloniex: https://poloniex.com
.. _Cookiecutter: https://github.com/audreyr/cookiecutter
.. _`audreyr/cookiecutter-pypackage`: https://github.com/audreyr/cookiecutter-pypackage



=======
History
=======

0.3.0 (not yet released)
------------------------
* Added backtest functionality. Cointrader can simulate trading in
  backtest mode. In this mode the trade is done on historic chart data. This
  is useful to check the performance of your trading strategy. Please note
  that the backtest is not 100% accurate as buy and sell prices are based on the
  closing price of the currency. This is idealistic and will not reflect the
  whole market situation.
* Added new "exchange" command. Can be used to calculate how many BTC you get
  for a certain amount of USD.

0.2.0 (2017-02-26)
------------------

* Improved "Usage" documentation
* Changed format of confiuration file from JSON to standard python
  configuration file (.ini)
* Added "balance" command
* Added "explore" command

0.1.0 (2017-02-21)
------------------

* First release on PyPI


