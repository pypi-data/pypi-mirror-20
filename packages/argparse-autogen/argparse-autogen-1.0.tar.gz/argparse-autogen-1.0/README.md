# argparse-autogen

[![PyPI version](https://badge.fury.io/py/argparse-autogen.svg)](https://badge.fury.io/py/argparse-autogen) [![GitHub version](https://badge.fury.io/gh/sashgorokhov%2Fargparse-autogen.svg)](https://badge.fury.io/gh/sashgorokhov%2Fargparse-autogen) [![Build Status](https://travis-ci.org/sashgorokhov/argparse-autogen.svg?branch=master)](https://travis-ci.org/sashgorokhov/argparse-autogen) [![codecov](https://codecov.io/gh/sashgorokhov/argparse-autogen/branch/master/graph/badge.svg)](https://codecov.io/gh/sashgorokhov/argparse-autogen) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/sashgorokhov/argparse-autogen/master/LICENSE)

Parser with automatic creation of parsers and subparsers for paths.

## Installation

```shell
pip install argparse-autogen
```

## Usage

`argparse_autogen.EndpointParser` is intended to replace basic `argparse.ArgumentParser`. It extends subparsers creation logic, and adds a new special method `add_endpoint`.

Simple example:
```python
import argparse_autogen

class MyCli():
  def do_stuff(self, target, force=False):
    """
    This does cool stuff!
    
    :param str target: Target to execute a cool stuff
    :param bool force: Force doing cool stuff
    """
    print(target, force)

cli = MyCli()

parser = argparse_autogen.EndpointParser()
parser.add_endpoint('do_stuff', cli.do_stuff)
parser.parse_and_call(['do_stuff', 'my target']) # this will print "my target false"
parser.parse_and_call(['do_stuff', '--force', 'my target']) # this will print "my target true"
```

`add_endpoint` method is clever enough to parse methods docstring and add corresponding helps in arguments. For example, 
`parser.parse_args(['do_stuff', '--help'])` in above example will show something like
```
usage: example.py do_stuff [-h] [--force]

This does cool stuff!

optional arguments:
  -h, --help  show this help message and exit
  --force     Force doing cool stuff
```
This magic is done by `argparse_autogen.autospec` function. It introspects function signature, and adds corresponding argparse arguments to parser. `*args` aguments in function are not supported - this parameter will be skipped. `**kwargs` are supported and can be passed as `[key=value [key=value ...]]`. You can override argument settings by passing `argument_overrides` option to `add_endpoint`. This must be a `dict[str, dict]` where keys are parameter name, and values are parameters to override defaults passed to `parser.add_argument`

## More endpoint examples

Nested class and complex paths:
```python
import argparse_autogen

class MyCli():
  def __init__(self):
    self.users = self.Users()
    self.groups = self.Groups()
  
  class Users():
    def get(self, user_id): pass
    def list(self, **filter): pass
    def update(self, user_id, **fields): pass
   
  class Groups():
    def get(self, group_id): pass

cli = MyCli()

parser = argparse_autogen.EndpointParser()

parser.add_endpoint('users.get', cli.users.get, argument_overrides={'user_id': {'help': 'Users id'}})
parser.add_endpoint('users.list', cli.users.list)
parser.add_endpoint('users.update', cli.users.update)

groups_get_parser = parser.add_endpoint('groups get', cli.groups.get, autospec=False)
groups_get_parser.add_argument('group_id', help='Group id')

users_parser = parser.get_endpoint_parser('users')
users_parser.description = 'Users operations'

parser.parse_and_call()
```
