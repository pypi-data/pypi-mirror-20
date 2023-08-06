try-default
===========

A microlibrary for handling exceptions.

Example:

.. code-block:: python

    from try_default import try_default

    foo = []
    result = try_default(lambda: foo[0], {IndexError: 'n/a'})
    # result: 'n/a'

    foo = ['spam']
    result = try_default(lambda: foo[0], {IndexError: 'n/a'})
    # result: 'spam'

    bar = {'egg': foo[0]}
    result = try_default(lambda: bar['spam'], {IndexError: 'n/a'})
    # Raises KeyError
