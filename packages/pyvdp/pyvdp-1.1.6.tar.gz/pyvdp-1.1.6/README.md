# pyvdp #

A collection of Python libraries for Visa Developer Program
-----------------------------------------------------------
This module implements a collection of convenience functions for [Visa Developer Program](https://developer.visa.com) 
initiative.

[![Code Climate](https://lima.codeclimate.com/github/ppokrovsky/pyvdp/badges/gpa.svg)](https://lima.codeclimate.com/github/ppokrovsky/pyvdp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5a119e1aafb9480c87736df4d0ab2a24)](https://www.codacy.com/app/ppokrovsky/pyvdp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ppokrovsky/pyvdp&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/ppokrovsky/pyvdp.svg?branch=master)](https://travis-ci.org/ppokrovsky/pyvdp)

## New in 1.1 ##

* Support for [Payment Account Attributes Inquiry (PAAI)](https://developer.visa.com/products/paai)

## Features ##

* Easy calls to VDP APIs, implemented through functions, named to reflect structure of actual VDP APIs
* Errors are handled as standard exceptions with meaningful messages
* OO-interface, data objects and transactions are simple Python classes
* Can be used with any web framework
* Includes demo Django application, demonstrating basic principles

## Introduction ##

Visa Developer Program (or VDP in short) is a collection of public RESTful APIs, maintained by VISA payment system. 
It implements a number of features, provided by VISA, such as eCommerce checkout, fraud management, loyalty programs,
money transfers etc. 
PyVDP is a library, written in Python, that provides wrappers for VDP methods in a functional way thus removing
a necessity for manual construction of HTTP requests (which is quite a boring and tedious process anyway).

I could have given a long marketing speech, instead here's an example on how to perform a call to [Payment Account 
Validation API](https://developer.visa.com/products/pav) using PyVDP:

```python
from visa.pav.data import PavTransaction
from visa.pav import cardvalidation 

data = PavTransaction(stan=123456, 
                      pan='1234567812345678', 
                      expiry_date='02-2020', 
                      cvv2='123')
                      
r = cardvalidation.send(data=data)
```

That's it. So basically all you need to do is to construct a data object (typically some sort of transaction) and pass 
this object as an argument to corresponding function. Pretty easy, right?

Since VDP is RESTful, it implements common RESTful logic, such as using HTTP verbs fo read/write operations. 
Generally, following logic is applied:
* If you're creating a new object (a new transaction for example), `HTTP POST` is used
* If you're updating an existing object, `HTTP PUT` is used
* If you want to receive some data from API (for example, a status of existing transaction), `HTTP GET` is used.

A status of request is represented by HTTP response code. For example, `200` means that request was successful. Any
other response code means that things went wrong (except `202` which is kinda special)
 
With PyVDP, `POST` requests are reflected with `send()` function, `GET` requests are reflected (*surprise!*) with
`get()` function. HTTP response codes are also processed and mapped to specific exceptions, so in case something is
wrong, a meaningful exception is raised.

So taking example above, under the hood, following magic occurs:
* `PavTransaction` object is instantiated with required attributes
* `cardvalidation.send()` function is called with `PavTransaction` passed as an argument
* `VisaPavRequest` is instantiated with `PavTransaction` passed as an argument along wв?dith `http_verb`, `resource` and
`api` argument values
* `VisaPavRequest` inherits from `VisaRequest` which is an abstract class, that implements all logic, related to
construction of request to VDP (including HTTP headers, authentication, url construction etc)
* `PavTransaction` is serialized to JSON 
* `PavTransaction` JSON is POSTed to [cardValidation](https://developer.visa.com/products/pav/reference#pav__pav__v1__cardvalidation)
*  If a request is valid, a response is returned as a JSON object, in case request is invalid, an exception is raised.

Also please note, that this documentation relies heavily on the [official VDP documentation](https://developer.visa.com/guides/vdpguide#get-started-overview) so be prepared to dig through tons of methods and specs there.

## Installation ##

```bash
$ pip install pyvdp
```

## Configuration ##
 
1. Register at [VDP Portal](https://developer.visa.com)
2. Create application, select corresponding APIs
3. Generate or download your app certificate and private key and place them under visa/private folder
4. Note your VDP username and password
5. Set your credentials and paths to keys in `visa/configuration.ini` file (see `visa/configuration.ini.example` as an 
example)

## Usage ##

PyVDP reflects a structure of RESTful resources through Python modules. That said, if you want to interact with, say,
[VisaDirect FundsTransfer API](https://developer.visa.com/products/visa_direct/guides#using_the_funds_transfer_api), 
you need to make yourself familiar with `visa.visadirect.fundstransfer` module. This approach is more or less
implemented throughout the whole library with respect to PEP naming conventions.

Below are described general use-case scenarios. I'm assuming, that you already registered an application with VDP, 
received all the necessary credentials (keys, usernames-password, certificates) and set them into library config.

### Basic usage ###

Interaction with VDP generally boils down to constructing a data object and submitting it to API endpoint. 
In RESTful paradigm (which is VDP), submitting data is done through `HTTP POST`  request.
`POST` requests are done using `send()` function of a corresponding library module with payload, passed as 
an argument. 
Receiving data from a resource is done using `HTTP GET` request. `GET` requests are done using `get()` function of a 
corresponding library module. `get()` accepts a string argument which is treated as a part of RESTful route or as a 
query string depending on specific API requirements

#### Constructing a data object ####

Data object is an instance of one or more modules, located in `data` module of corresponding API. This modules contain
blueprints of data objects, that can be submitted to corresponding API. For example, module 
`visa.visadirect.fundstransfer.data` implements all possible kinds of transactions, that may be used for 
`FundsTransfer` API. Essentially, a data object is nothing more, but a simple Python class, which sets a list of 
attributes within its constructor. Attributes are passed as `**kwargs`. With respect to attribute names, generally
VDP follows a camelCase convention, while PEP8 recommends underscore_naming. Therefore, prior to assigning attributes,
they are mapped from **under_score** to **camelCase**. Generally this is done through declaration of `ATTR_MAPPINGS`
class-level constant, which sets a dictionary with keys, equal to argument names for data object constructor and
values, equal to attribute names, that are accepted by VDP. This constant is also used to set possible arguments, so 
if ``kwargs`` contains a key, which is not listed in `ATTR_MAPPINGS`, this attribute will be ignored. On the other 
hand,  if attribute is declared in `ATTR_MAPPINGS` but not listed in kwargs, it won't be added to an instantiated 
object. This makes possible assignment of optional or conditional attributes. 

Error handling with respect to presence of required or conditional attributes is done on VDP side. In case, for example,
a required attribute is missing, VDP will return HTTP code, different from `200 (Success)`, and corresponding exception 
will be raised. 

Since data object attributes are API-specific, `ATTR_MAPPINGS` is declared in every applicable data class, although the
name `ATTR_MAPPINGS` itself is a sort of convention.

Also some data objects may contain nested objects. In this case, a nested object itself also needs to be configured, 
instantiated and passed as an arguments to parent. Below is an example of such object. 

Please note that this and further examples won't necessarily work in your environment (including sandbox), since 
validation of specific transactions  depends on horde of various properties, including geolocation, account properties 
etc. 

This is an example code for creating a data object for [FundsTransfer PushFundsTransaction](https://developer.visa.com/products/visa_direct/reference#visa_direct__funds_transfer__v1__pushfunds):
```python
from visa.visadirect.data import CardAcceptor
from visa.visadirect.fundstransfer.data import PushFundsTransaction

# CardAcceptor is nested within PushTransaction object. CardAcceptor is specific for VisaDirect APIs, so it is located 
# in visadirect.data.card_acceptor module.
ca = CardAcceptor(name='Acceptor 1', 
                  country='RU', 
                  terminal_id='TID-9999', 
                  id_code='CA-IDCode-77765')

# This is an actual PushTransaction object. Please note, that instance of CardAcceptor is passed with card_acceptor
# argument
t = PushFundsTransaction(stan=123456, 
                         amount=123.45, 
                         sender_pan='1234567812345678', 
                         sender_card_expiry_date='12-2020',
                         sender_currency_code='USD', 
                         card_acceptor=ca)
```

#### Sending data to VDP ####  

Sending data to VDP means that you have an object (transaction) and you need to send it to VISA for further processing.
With PyVDP, all you need to do is to call a `send()` function from corresponding API module passing a data object as an 
argument. Taking example above, your code will look like:

```python
from visa.visadirect.fundstransfer import push_funds

push_funds.send(transaction=t)
```

Under the hood, instance of `PushTransaction` with nested `CardAcceptor` will be serialized to JSON and passed to VDP
as a payload of POST request.

A response will contain HTTP code and some JSON payload. `200 Success` is the only successful HTTP code, all other codes 
are considered errors and handled through corresponding exceptions. The only (and big) exception from this rule is 
code `202` which means, that transaction is timed out. The payload of `202` response is a transaction identifier.
Receiving a 202 response will raise an exception anyway, but in this case you may use its payload, for example, to
 perform retries to get a final status.
This identifier can be used together with `get()` requests in order to get a status of submitted transaction. Therefore
it is recommended that `202` responses are to be treated accordingly. Also `202` is returned always when handling 
batched (`multiple`) transactions, such as [MultiPullFundsTransactions](https://developer.visa.com/products/visa_direct/reference#visa_direct__funds_transfer__v1__multipullfunds)

#### Receiving data from VDP ####

Receiving data from VDP means, that you have some kind of string on hands and would like to get a detailed data, mapped
to this string. Typical use-case are status identifiers, that are received as a payload for `202` HTTP responses.
Getting an information from VDP is done, well, using `get()` function of corresponding API module. In fact, there can
be two types of payload, submitted with `GET` method:
1. A part of URL, mapped to RESTful route (e.g. `/visadirect/fundstransfer/v1/pullfundstransactions/{statusIdentifier}`)
2. An actual `QUERY_STRING` (good old `?key=value&key2=value2` notation)

Which one (or combination) is used depends on specific API. Take a look at the docstrings in corresponding module for
details.

Anyway, here's a snippet, that retrieves a status of specific PushFunds transaction, based on statusIdentifier, returned 
with `202` response:

```python
from visa.visadirect.fundstransfer import push_funds

push_funds.get(status_id='1488805457_180_64_l73c034_VDP_ARM')
```

### Advanced usage ###

Modules, that implement `send()` and `get()` functions are, in fact, no more than simple helpers, that perform 
preconfigured requests. If necessary, you may further customize behavior and implement your own logic on top of 
existing. To do so, you need to take a look at `request` modules, that implement a connection to a specific API endpoint 
and all related logic, such as HTTP headers, query strings etc. 

All `request` modules inherit from `visa.request.VisaRequest` class. This class is a mastermind of interaction with VDP.
It implements construction of HTTP request, including serialization of data objects, construction of HTTP headers,
submission with corresponding HTTP method and handling exceptions.
`VisaRequest` is considered abstract and it should not be instantiated on its own. Instead, it should be inherited by
concrete implementation for specific APIs.

Check out [API documentation](https://ppokrovsky.github.io/pyvdp/index.html) for further details.

## Questions ##

Please use the issue tracker to ask questions.

## License ##

Copyright &copy; 2017 Pavel Pokrovskiy.

MIT licensed.
