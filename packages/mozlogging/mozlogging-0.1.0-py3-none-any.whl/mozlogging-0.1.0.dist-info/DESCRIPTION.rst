mozlogging: MozLog with the logging Module
========================================

.. image:: https://img.shields.io/pypi/v/mozlogging.svg
    :target: https://pypi.python.org/pypi/mozlogging

.. image:: https://img.shields.io/pypi/l/mozlogging.svg
    :target: https://pypi.python.org/pypi/mozlogging

.. image:: https://img.shields.io/pypi/wheel/mozlogging.svg
    :target: https://pypi.python.org/pypi/mozlogging

.. image:: https://img.shields.io/pypi/pyversions/mozlogging.svg
    :target: https://pypi.python.org/pypi/mozlogging


Example:

.. code-block:: python

    >>> import logging
    >>> from mozlogging import MozLogFormatter
    >>> logger = logging.getLogger('example')
    >>> handler = logging.StreamHandler()
    >>> handler.setFormatter(MozLogFormatter())
    >>> logger.addHandler(handler)
    >>> logger.error({'dict': 1, 'of': 2, 'fields': 3}, 'my.message.type')
    {"EnvVersion": "2.0", "Fields": {"dict": 1, "fields": 3, "of": 2}, "Logger": "example", "Severity": 3, "Timestamp": 1489366186847323648, "Type": "my.message.type"}


