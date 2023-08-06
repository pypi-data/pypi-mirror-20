Tengri
======

.. image:: https://travis-ci.org/robertdurkaj/tengri.svg?branch=master
  :target: https://travis-ci.org/robertdurkaj/tengri/builds

Do you regularly check weather forecast a day before an activity? This
command-line tool scrapes the following web forecasts for you:

- `www.meteoblue.com`_
- `www.yr.no`_
- `www.mountain-forecast.com`_

Usage example::

  $ tengri Khan Tengri

Output::

  Tengri weather report for: "Khan Tengri"

  meteoblue.com
  -------------
  : Weather Khan Tängiri Shyngy
  : Kazakhstan, 42.21°N 80.18°E 6995m asl
  : Tomorrow
  Max temp: -28 °C
  Min temp: -36 °C
  Wind: 10 km/h
  ...


Install
-------
To install Tengri::

  pip install tengri


Develop
-------
To start working on project, install it in editable (development) mode. This
makes tengri package importable and installs launch script on system path. See
`pip "Editable" install`_::

  $ pip install -e .

To start tests, ``pytest`` has to be installed first::

  $ pip install pytest

Then from project dir run tests by::

  $ pytest

To undo the development setup, use ``pip uninstall`` command. It updates python
path and removes launch script::

  $ pip uninstall tengri

If you are working on many python projects consider using `virtualenv`_.

For convenience ``make`` is used to facilitate project setup (see
``Makefile`` and ``requirements.txt``).


Author
------
- Robert Durkaj


Credit
------
- `Kenneth Reitz`_ for the idea: http://docs.python-guide.org/en/latest/ 
- `Benjamin Gleitzman`_ for the inspiration: https://github.com/gleitz/howdoi 

.. _`www.meteoblue.com`: https://www.meteoblue.com/en/weather/forecast/week/khan-t%c3%a4ngiri-shyngy_kazakhstan_1537336
.. _`www.yr.no`: http://www.yr.no/place/Kyrgyzstan/Other/Sheng-li_Feng/?spr=eng
.. _`www.mountain-forecast.com`: http://www.mountain-forecast.com/peaks/Khan-Tengri/forecasts/7010
.. _`pip "Editable" install`: https://pip.pypa.io/en/stable/reference/pip_install/#editable-installs
.. _`virtualenv`: https://virtualenv.pypa.io/
.. _`Kenneth Reitz`: https://www.kennethreitz.org/
.. _`Benjamin Gleitzman`: https://github.com/gleitz


