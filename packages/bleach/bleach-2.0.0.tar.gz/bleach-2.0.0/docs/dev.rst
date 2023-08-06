==================
Bleach development
==================

Docs
====

Docs are in ``docs/``. We use Sphinx. Docs are pushed to ReadTheDocs
via a GitHub webhook.


Testing
=======

Run::

    $ tox

That'll run Bleach tests in all the supported Python environments. Note
that you need the necessary Python binaries for them all to be tested.

Tests are run in Travis CI via a GitHub webhook.


Release process
===============

1. Checkout master tip.

2. Check to make sure ``setup.py`` and ``requirements.txt`` are
   correct and match requirements-wise.

3. Update version number in:

   * ``bleach/version.py``

   Set the version to something like ``VERSION = (1, 4, 3)``.

4. Update ``CONTRIBUTORS``, ``CHANGES`` and ``MANIFEST.in``.

5. Verify correctness.

   1. Run tests with tox::

         $ tox

   2. Build the docs::

         $ cd docs
         $ make html

   3. Run the doctests::

         $ cd docs/
         $ make doctests

   4. Verify everything works

6. Commit the changes.

7. Push the changes to GitHub. This will cause Travis to run the tests.

8. After Travis is happy, tag the release::

     $ git tag -a v0.4

   Copy the details from ``CHANGES`` into the tag comment.

9. Push the new tag::

     $ git push --tags official master

   That will push the release to PyPI.

10. Blog posts, twitter, update topic in ``#bleach``, etc.
