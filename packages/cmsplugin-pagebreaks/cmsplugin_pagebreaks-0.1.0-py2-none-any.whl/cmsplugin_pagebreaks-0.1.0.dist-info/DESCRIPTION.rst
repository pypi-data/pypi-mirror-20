cmsplugin-pagebreaks
====================

Split your content into pages with pagination in DjangoCMS.

Author
------

* Grzegorz Biały (https://github.com/grzegorzbialy/)
* ELCODO (http://elcodo.pl)

Requirements
------------

* django-cms 3.x

Quick start
-----------

1. Add "cmsplugin_pagebreaks" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'cmsplugin_pagebreaks',
    ]

Settings
--------

* CMSPLUGIN_PAGEBREAKS_PAGE_GET_PARAMETER - default 'page'. Name of GET parameter with page number.


