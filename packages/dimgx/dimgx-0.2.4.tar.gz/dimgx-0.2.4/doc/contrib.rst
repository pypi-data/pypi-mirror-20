.. -*- encoding: utf-8; mode: rst -*-
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    >>>>>>>>>>>>>>>> IMPORTANT: READ THIS BEFORE EDITING! <<<<<<<<<<<<<<<<
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Please keep each sentence on its own unwrapped line.
    It looks like crap in a text editor, but it has no effect on rendering, and it allows much more useful diffs.
    Thank you!

.. toctree::
    :maxdepth: 3
    :hidden:

Copyright and other protections apply.
Please see the accompanying :doc:`LICENSE <LICENSE>` and :doc:`CREDITS <CREDITS>` file(s) for rights and restrictions governing use of this software.
All rights not expressly waived or licensed are reserved.
If those files are missing or appear to be modified from their originals, then please contact the author before viewing or using this software in any capacity.

Contributing to ``dimgx``
=========================

There are several ways you can contribute.

Filing Issues
-------------

You can `file new issues <https://github.com/posita/dimgx/issues>`__ as you find them.
Please avoid duplicating issues.
These may be helpful:

*   `Tips to Write a Good Bug Report <http://itscommonsensestupid.blogspot.com/2008/07/tips-to-write-good-bug-report.html>`__ by Soon Hui
*   `Writing Effective Bug Reports <http://testobsessed.com/wp-content/uploads/2011/07/webr.pdf>`__ (PDF) by Elisabeth Hendrickson

Submission Guidelines
---------------------

If you're willing and able, consider `submitting a pull request <https://github.com/posita/dimgx/pulls>`__ (PR) with a fix.
There are only a few guidelines:

*   If it isn't already there, please add your name (and optionally your GitHub username, email, website address, or other contact information) to the ``CREDITS`` file::

    ...
    *   Gordon the Turtle <https://github.com/GordonTheTurtle>
    ...

*   Try to follow the source conventions as you observe them.
    (Note: I have purposely avoided aspects of `PEP8 <https://www.python.org/dev/peps/pep-0008/>`_, in part because I have adopted conventions developed from my experiences with other languages, but mostly because I'm growing older and more stubborn.)

..

*   Provide unit tests where feasible and appropriate.
    At the very least, existing tests should not fail.
    (There are exceptions, but if there is any doubt, they probably don't apply.)
    Tests can be run with ``./runtests.sh`` (requires `tox <https://tox.readthedocs.org/en/latest/>`__) or ``python setup.py test``.

..

* If you need me, mention me (|@posita|_) in your comment, and describe specifically how I can help.

.. |@posita| replace:: **@posita**
.. _`@posita`: https://github.com/posita

* If you want feedback on a work-in-progress (WIP), create a PR and prefix its title with something like, "``NEED FEEDBACK -``".

..

* If your PR is still in progress, but you aren't blocked on anything, prefix the title with something like, "``WIP -``".

..

*   Once you're ready for a merge, resolve any merge conflicts, squash your commits, and provide a useful commit message.
    (`This <https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history>`__ and `this <http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html>`__ may be helpful.)
    Then prefix the PR's title to something like, "``READY FOR MERGE -``".
    I'll try to get to it as soon as I can.
