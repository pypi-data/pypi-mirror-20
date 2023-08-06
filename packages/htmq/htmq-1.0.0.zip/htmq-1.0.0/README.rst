====
htmq
====


Supported platforms
===================

* Python 3.4
* Windows


Installlation
=============

To install via pip:

`> pip install htmq`


Usage
=====

Get text inside all the div tags with class='test' as a list::

        from htmq.html_query import htmq
        # get html from somewhere
        htmq(html).all().div(cls='test').text().q()


Download
========

* PyPI: http://pypi.python.org/pypi/htmq
* Source: https://github.com/amol9/htmq
