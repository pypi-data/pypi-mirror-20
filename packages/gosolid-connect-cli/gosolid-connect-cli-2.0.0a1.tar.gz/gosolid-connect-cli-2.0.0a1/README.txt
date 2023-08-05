if uninitialized:

``python setup.py register -r pypi``

...then sign in

to push new versions

1. edit version number in setup.py
2. ``python setup.py sdist upload -r pypi``