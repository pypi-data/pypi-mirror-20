# autocloudreporter

`autocloudreporter` is a fedmsg consumer for reporting Autocloud results to
ResultsDB. It listens out for Autocloud fedmsg messages, and submits results
using the resultsdb_conventions module for conveniently reporting results in
'conventional' format.

The code was written with Python 3 in mind, but it turns out that verification
of fedmsg message signatures does not currently work in Python 3, so it should
be run under Python 2 for now.

## Requirements

Python libraries:

* fedmsg
* [fedfind](https://pagure.io/fedora-qa/fedfind)
* [resultsdb_api](https://pagure.io/taskotron/resultsdb_api)

## Installation

Install the required external Python libraries, then use setuptools to
install, e.g.:

        python setup.py install

## Test and production modes

Two consumers are provided, a 'test' and a 'production' consumer. For 'test':

* The consumer listens for `dev` (not `prod`) messages
* The consumer does not validate message signatures
* The consumer reports to a ResultsDB instance running on localhost port 5001

In this mode it is safe to play around with the consumer, and you can use a
tool like `fedmsg-dg-replay` to trigger event creation by replaying a relevant
fedmsg (which will show up with a `dev` topic rather than `prod`).

For 'production':

* The consumer listens for `prod` (not `dev`) messages
* The consumer validates message signatures
* The consumer reports to the production ResultsDB instance (if permitted)

**PLEASE** do not enable the production consumer on a system authorized to
submit results to ResultsDB without checking with Fedora QA.

The fedmsg config keys for the consumers are `autocloudreporter.test.enabled`
and `autocloudreporter.prod.enabled` respectively.

## License

`autocloudreporter` is released under the GPL, version 3 or later. See `COPYING`
and the header of `autocloudreporter.py` itself.
