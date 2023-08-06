breakers
========

.. image:: https://travis-ci.org/elemepi/breakers.svg?branch=master
    :target: https://travis-ci.org/elemepi/breakers

Usable Circuit Breaker pattern implementation.


Install
-------

.. code:: bash

    $ pip install breakers


Usage
-----

.. code:: python

    import functools
    from breakers import Breaker

    def circuit_breaker(time_span=20000, unit=1000, calls_limit=10,
                        error_limit=0.5, retry_time=10000):
        def deco(func):
            # Create breaker
            if not hasattr(func, '__breaker__'):
                func.__breaker__ = Breaker(time_span, unit, calls_limit,
                                           error_limit, retry_time)
            breaker = func.__breaker__

            @functools.wraps(func)
            def wraps(*args, **kwargs):
                if not breaker.is_allow():
                    raise RuntimeError('Circuit breaker')

                exc = None
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    exc = e
                    raise
                finally:
                    if exc:
                        breaker.add_failure(1)
                    else:
                        breaker.add_success(1)
            return wraps
        return deco

    @circuit_breaker()
    def f():
        import random
        if random.randint(1, 4) in (1, 2):
            raise ValueError
        return 'succeed'
