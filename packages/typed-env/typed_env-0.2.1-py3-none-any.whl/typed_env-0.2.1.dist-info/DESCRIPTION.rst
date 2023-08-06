How to publish to Pypi:
~~~~~~~~~~~~~~~~~~~~~~~

Ensure that version is bumped:

::

    bumpversion major/minor/patch

Clean building directory:

::

    rm -rf build/ dist/ 

Build a wheel:

::

    python setup.py bdist_wheel

And upload to the pypi:

::

    twine upload dist/* -r pypi


