bitmex-websocket
==========================

[![Build Status](https://travis-ci.org/joliveros/bitmex-websocket.svg?branch=master)](https://travis-ci.org/joliveros/bitmex-websocket)
[![Requires.io](https://requires.io/github/joliveros/bitmex-websocket/requirements.svg?branch=master)](https://requires.io/github/joliveros/bitmex-websocket/requirements?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/joliveros/bitmex-websocket/badge.svg?branch=master)](https://coveralls.io/github/joliveros/bitmex-websocket?branch=master)

Bitmex Websocket API Wrapper

## Install

```bash
pip install bitmex-websocket
```



## Usage

1. First you should set your `BITMEX_API_KEY` and `BITMEX_API_SECRET`. It can
   be done as follows:
   ```bash
   $ cp .env.example .env
   #  edit .env to reflect your API key and secret
   $ source .env
   ```

1. Then in your project you can consume `Instrument` as follows:
    ```python
    from bitmex_websocket import Instrument
    import asyncio
    import websocket

    websocket.enableTrace(True)

    XBTH17 = Instrument(symbol='XBTH17',
                        # subscribes to all channels by default, here we
                        # limit to just these two
                        channels=['margin', 'orderBook10'],
                        # you must set your environment variables to authenticate
                        # see .env.example
                        shouldAuth=True)

    # Get the latest orderbook
    orderBook10 = XBTH17.get_table('orderBook10')

    # subscribe to all action events for this instrument
    XBTH17.on('action', lambda x: print("# action message: %s" % x))

    loop = asyncio.get_event_loop()
    loop.run_forever()
    ```

## Examples
  Run example scripts:
  ```bash
  RUN_ENV=test python -m examples.example-1
  ```
## Tests

Testing is set up using [pytest](http://pytest.org) and coverage is handled
with the pytest-cov plugin.

Run your tests with ```py.test``` in the root directory.

Coverage is ran by default and is set in the ```pytest.ini``` file.
To see an html output of coverage open ```htmlcov/index.html``` after running the tests.

