cronquot
========

|PyPI version| |Build Status| |Code Climate| |Coverage Status|
|Documentation Status|

| cronquot is a command/library for quoting cron execution.
| You can create a list of cron scheduler with this tool. Only you
  should do is preparing your cron data.

Usage
-----

Preparation
~~~~~~~~~~~

| To run *cronquot*, you have to make directory and put cron files
  exported from ``crontab -l``.
| File names should server names like below.

::

    $ tree
    crontab/
    ├── server1
    ├── server2
    └── web1

CUI
~~~

From command, you can use only one command.

::

    # You can set start time and end time.
    $ cronquot -s 20170201010000 -e 20170201020000

After this, result file will export as 'result.csv'.

Python sample source code
~~~~~~~~~~~~~~~~~~~~~~~~~

*You can use this with only python2.7*

.. code:: python

    from cronquot.cronquot import Cron

    c = Cron(start='20170101000000',
             end='20170101101000')
    for cc in c:
          print(cc)

Installation
------------

::

    $ pip install cronquot

Licence
-------

-  MIT

.. |PyPI version| image:: https://badge.fury.io/py/cronquot.svg
   :target: https://badge.fury.io/py/cronquot
.. |Build Status| image:: https://travis-ci.org/pyohei/cronquot.svg?branch=master
   :target: https://travis-ci.org/pyohei/cronquot
.. |Code Climate| image:: https://codeclimate.com/github/pyohei/cronquot/badges/gpa.svg
   :target: https://codeclimate.com/github/pyohei/cronquot
.. |Coverage Status| image:: https://coveralls.io/repos/github/pyohei/cronquot/badge.svg?branch=master
   :target: https://coveralls.io/github/pyohei/cronquot?branch=master
.. |Documentation Status| image:: https://readthedocs.org/projects/cronquot/badge/?version=latest
   :target: http://cronquot.readthedocs.io/en/latest/?badge=latest
