README
======

This repository contains a small (presently <300 line) script in Python 3.X
which can be used to convert a git or subversion change log into a
report estimating how many hours each contributor spent working on the
project. 
  
The report is broken down per-contributor, per-day, and
includes some summary lines at the end.

The recommended ways of running the script is to run something like one
of the following commands:

python3 vceffort.py { –git \| –svn } path/to/local/repository

python3 vceffort.py { –git \| –svn } http://url.for.remote.repository

git –git-dir=local/path/.git log –date=iso \| python3 vceffort.py –git –

svn log -q local.path.or.remote.url \| python3 vceffort.py –svn –

Example report
--------------

::

    Entries:
    --------
    2016-09-10 UTC+08:00 5.3 Tim Littlefair
    2016-09-11 UTC+08:00 3.0 Tim Littlefair
    2016-09-17 UTC+00:00 1.0 Tim Littlefair
    2016-09-17 UTC+08:00 1.0 Tim Littlefair
    2016-09-18 UTC+08:00 1.9 Tim Littlefair
    2016-09-19 UTC+08:00 1.0 Tim Littlefair
    2016-09-25 UTC+08:00 2.8 Tim Littlefair
    2016-09-26 UTC+08:00 1.0 Tim Littlefair
    ========
    Summary:
    --------
    Total active contributor days: 8
    Total hours worked: 17.0
    Mean hours per day: 2.125

Approximations made by the tool
-------------------------------

The tool makes the following assumptions in order to convert
a series of instantaneous events into a presumed sequence of
continuous activities:

-  when a commit is seen after a period of inactivity, the tool
   assumes that the contributor has been working for 45 minutes
   prior to the commit;
-  when a commit is seen within 2 hours of the previous commit
   by the same contributor, the tool assumes that the contributor
   has been working between the two commits; and
-  when a commit is followed by a period of inactivity of more
   than 2 hours, the tool assumes that the contributor worked
   for 15 minutes after the commit then stopped working.

During the analysis, the tool separates the stream of log events up
into calendar days in the contributor’s timezone. Two events
which are either side of midnight will never be combined into a
single activity sequence. If there are log events associated with
the same contributor in different timezones, these will be treated
as if they were from different contributors (for example the
example report above shows the effect of a commit which occurred
on 2016-09-11 at bitbucket.org, and had a different timezone
from other commits which happened on the same day on a local git
repository on my workstation).

Motivations for this project
----------------------------

Originally, this script was a side-project of a side-project.
I wanted to write a presentation about some work I was doing
and I wanted to give the audience as sense of how much of my
personal time had been invested to date.

As I worked on the script, I discovered that it was a nice
small scope problem which was a good showcase for some of the
practices the earlier side-project was intended to help me
explore:

-  measuring code coverage achieved by my unit tests;
-  using pylint to train myself to conform to the PEP-8 coding
   style recommendations for Python;
-  implementing continuous integration using Jenkins.

As of the current HEAD state, code coverage is at or near 100%.

From my point of view at the moment, the following tasks
remain to be done:

-  implement continuous integraton using Jenkins;
-  package and publish the library via PyPi and 
   resolve any bug reports I receive against the 
   existing scope of behaviour.

I am using the bitbucket issue tracking feature to
maintain a backlog for the project. See the up-to-date
list `here`_

I have no ambition for this project to grow beyond the
size required to complete the tasks above. My hope
and expectation is that it will never contain more than
1000 lines of code (excluding test data).

Contribution Guidelines
-----------------------

This work is licensed under `the MIT License`_.

The license permits you to copy the source, and work with it in 
whatever way you like, providing credit is given for whatever remains 
of my own work in your product.

The development/test  environment for the project requires an installation 
of Python 2 or 3 (preferably 3.5) with PyLint and the coverage module 
installed. The scripts showcase.sh and showcase.cmd bootstrap a suitable
environment and run the tests within it.

If you are interested in contributing to the copy of this project
which I am managing myself, please note that I do not have an
ambition for it to become a long-running open ended project.
I will be happy to receive messages and pull requests via bitbucket,
but please note that this is intended by me as a showcase codebase,
so integration of contributions will depend on them maintaining the
pylint and code coverage stats at at least the current level
at the time of your contribution.

See the section below for details of how to get in touch with me.

Who do I talk to?
-----------------

Due to past experience publishing my email address in relation to
open source projects, I am deliberately not publishing an email
address as part of this project.

If you want to talk to me about this project my preferred method
is for you to create an account on http://bitbucket.org and use
the facility there to send me a message.

You can also find me on `LinkedIn`_.

You should expect me to respond to your message in the
first instance via bitbucket or LinkedIn, not via direct email.

.. _here: https://bitbucket.org/tim_littlefair/vclog2timesheet/issues
.. _the MIT License: https://opensource.org/licenses/MIT
.. _LinkedIn: https://www.linkedin.com/in/tim-littlefair/
