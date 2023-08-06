helga-pointing-poker
==============

.. image:: https://badge.fury.io/py/helga-pointing-poker.png
    :target: https://badge.fury.io/py/helga-pointing-poker

.. image:: https://travis-ci.org/narfman0/helga-pointing-poker.png?branch=master
    :target: https://travis-ci.org/narfman0/helga-pointing-poker

Pointing poker for helga

Installation
------------

Install via pip::

    pip install helga-pointing-poker

And add to settings!

Usage
-----

There are 3 main actions: point, show, status.

Point - when coming upon a new item to point, users may invoke the point command.
It takes 2 arguments: the item in question, and an estimate for that item. e.g.::

    !poker point #1 3

The above example means the user wishes to point item #1 with 3 points. Another::

    !poker point B-12345 3

Above again means 3 points should be attributed to this story. The name of the item
can be any arbitrary string. Note: the argument `--skip-remove` can allow for
duplicate votes, for debugging, or if one wishes to be sneaky :).

Show - show all votes and median/average. The median should be the accepted point
value - after some lively discussion no doubt :). e.g.::

    narfman0> !poker point #1 3
    scubasteve> !poker point #1 3
    narfman0> !poker show #1
    helga> Median:3 avg:3 votes:narfman03, scubasteve:3

Status - show the current status of votes. Will say how many people have voted
who voted::

    narfman0> !poker point #1 3
    scubasteve> !poker point #1 3
    narfman0> !poker status #1
    helga> 2 votes from: narfman0, scuba steve for #1

There are also utilitarian commands between sessions. For later information,
a user may ``dump`` all the database contents with::

    > !poker dump

Or, to completely clear the database::

    > !poker clear

Development
-----------

Install all the testing requirements::

    pip install -r requirements_test.txt

Run tox to ensure everything works::

    make test

You may also invoke `tox` directly if you wish.

Release
-------

To publish your plugin to pypi, sdist and wheels are (registered,) created and uploaded with::

    make release

License
-------

Copyright (c) 2017 Jon Robison

See LICENSE for details
