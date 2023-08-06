# cronquot

[![PyPI version](https://badge.fury.io/py/cronquot.svg)](https://badge.fury.io/py/cronquot)
[![Build Status](https://travis-ci.org/pyohei/cronquot.svg?branch=master)](https://travis-ci.org/pyohei/cronquot)
[![Code Climate](https://codeclimate.com/github/pyohei/cronquot/badges/gpa.svg)](https://codeclimate.com/github/pyohei/cronquot)
[![Coverage Status](https://coveralls.io/repos/github/pyohei/cronquot/badge.svg?branch=master)](https://coveralls.io/github/pyohei/cronquot?branch=master)
[![Documentation Status](https://readthedocs.org/projects/cronquot/badge/?version=latest)](http://cronquot.readthedocs.io/en/latest/?badge=latest)

cronquot is a command/library for quoting cron execution.    
You can create a list of cron scheduler with this tool.
Only you should do is preparing your cron data.

## Usage

### Preparation

To run _cronquot_, you have to make directory and put cron files exported from `crontab -l`.  
File names should server names like below.

```
$ tree
crontab/
├── server1
├── server2
└── web1
```

### CUI

From command, you can use only one command.

```
# You can set start time and end time.
$ cronquot -s 20170201010000 -e 20170201020000
```

After this, result file will export as 'result.csv'.

### Python sample source code

*You can use this with only python2.7*


```python
from cronquot.cronquot import Cron

c = Cron(start='20170101000000',
         end='20170101101000')
for cc in c:
      print(cc)
```

## Installation

```
$ pip install cronquot
```


## Licence

* MIT
