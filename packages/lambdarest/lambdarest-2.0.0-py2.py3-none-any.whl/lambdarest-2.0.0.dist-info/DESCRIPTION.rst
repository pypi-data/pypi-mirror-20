# lambdarest

[![Build Status](http://travis-ci.org/trustpilot/python-lambdarest.svg?branch=master)](https://travis-ci.org/trustpilot/python-lambdarest)  [![Latest Version](https://img.shields.io/pypi/v/lambdarest.svg)](https://pypi.python.org/pypi/lambdarest) [![Python Support](https://img.shields.io/pypi/pyversions/lambdarest.svg)](https://pypi.python.org/pypi/lambdarest)

Python pico framework for [AWS Lambda](https://aws.amazon.com/lambda/) with optional JSON-schema validation.

### Features

* `lambda_handler` function constructor with built-in dispatcher
* Decorator to register functions to handle HTTP methods
* Optional JSON-schema input validation using same decorator

## Installation

Install the package from [PyPI](http://pypi.python.org/pypi/) using [pip](https://pip.pypa.io/):

```bash
pip install lambdarest
```

## Getting Started

This module helps you to handle different HTTP methods in your AWS Lambda.

```python
from lambdarest import create_lambda_handler

lambda_handler = create_lambda_handler()

@lambda_handler.handle("get")
def my_own_get(event):
    return {"this": "will be json dumped"}


##### TEST #####


input_event = {
    "body": '{}',
    "httpMethod": "GET"
}
result = lambda_handler(event=input_event)
assert result == {"body": '{"this": "will be json dumped"}', "statusCode": 200, "headers":{}}
```

Optionally you can validate an incoming JSON body against a JSON schema:


```python
from lambdarest import create_lambda_handler

lambda_handler = create_lambda_handler()

my_schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "body":{
            "type": "object",
            "properties": {
                "foo": {
                    "type": "string"
                }
            }
        }
    }
}

@lambda_handler.handle("get", schema=my_schema)
def my_own_get(event):
    return {"this": "will be json dumped"}


##### TEST #####


valid_input_event = {
    "body": '{"foo":"bar"}',
    "httpMethod": "GET"
}
result = lambda_handler(event=valid_input_event)
assert result == {"body": '{"this": "will be json dumped"}', "statusCode": 200, "headers":{}}


invalid_input_event = {
    "body": '{"foo":666}',
    "httpMethod": "GET",
}
result = lambda_handler(event=invalid_input_event)
assert result == {"body": '"Validation Error"', "statusCode": 400, "headers":{}}
```

## Tests

You can use pytest to run tests against your current Python version. To run tests for all platforms, use tox or the built-in `test-all` Make target:

```
make test-all
```

See [`requirements_dev.txt`](requirements_dev.txt) for test dependencies.


Release History
---------------

2.0.0 (2017-03-4)
+++++++++++++++++++

**This is not a backwards compatible change.**

First OSS release

features:
- now json is divided into ["json"]["body"] for post body and ["json"]["query"] for json loaded query params
- jsonschema validation gets whole ["json"] object so remember to change your schemas/code!!!



1.0.1 (2017-02-24)
+++++++++++++++++++

**This is not a backwards compatible change.**

First OSS release

features:
- dispatching handler for individual HTTP methods
- (optional) jsonschema validation for endpoints
- automatic wrapping of responses


