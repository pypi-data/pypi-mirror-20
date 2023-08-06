bank-card |PyPI version| |https://travis-ci.org/xjw0914/bank-card|
==================================================================

Get bank card info according to bank card number!

### Installation
----------------

``bank-card`` is hosted on
`PYPI <https://pypi.python.org/pypi/bank_card>`__ and can be installed
as such:

::

    $ pip install bank-card

Alternatively, you can also get the latest source code from
`GitHub <https://github.com/xjw0914/bank-card>`__ and install it
manually:

::

    $ git clone https://github.com/xjw0914/bank-card.git
    $ cd bank-card
    $ python setup.py install

For update:

::

    $ pip install bank-card --upgrade

### Basic Usage
---------------

::

    In [1]: from bank_card import BankCard

    In [2]: c = BankCard(6225700000000000)

    In [3]: c.bank_name
    Out[3]: u'\u4e2d\u56fd\u5149\u5927\u94f6\u884c'

    In [4]: print c.bank_name
    中国光大银行

    In [5]: print c.to_dict()
    {'bank_name': u'\u4e2d\u56fd\u5149\u5927\u94f6\u884c', 'card_type': u'CC', 'bank_image': u'https://apimg.alipay.com/combo.png?d=cashier&t=CEB', 'card_type_name': u'\u4fe1\u7528\u5361', 'validated': True, 'bank': u'CEB'}

### License
-----------

Apache-2.0
(`Here <https://github.com/xjw0914/bank-card/blob/master/LICENSE>`__)

.. |PyPI version| image:: https://badge.fury.io/py/bank_card.svg
   :target: https://badge.fury.io/py/bank_card
.. |https://travis-ci.org/xjw0914/bank-card| image:: https://travis-ci.org/xjw0914/bank-card.svg?branch=master
