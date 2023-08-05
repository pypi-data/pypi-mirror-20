============================================
Make Django requests aware of the DNT header
============================================

Do Not Track offers an easy way to pay attention to the ``DNT`` HTTP header. If
users are sending ``DNT: 1``, ``DoNotTrackMiddleware`` will set ``request.DNT =
True``, else it will set ``request.DNT = False``.

Just add ``dnt.middleware.DoNotTrackMiddleware`` to your ``MIDDLEWARE_CLASSES``
(Django 1.9 and earlier) or ``MIDDLEWARE`` (Django 1.10 and later) and you're
good to go.



Release History
---------------

v0.2.0 - 2017-02-17
~~~~~~~~~~~~~~~~~~~
* Supported Django versions: 1.8, 1.9, 1.10, and 1.11
* Supported Python versions: 2.7, 3.3, 3.4. 3.5, 3.6
* Add "DNT" to Vary header in response (eillarra)

v0.1.0 - 2011-02-16
~~~~~~~~~~~~~~~~~~~
* Initial Release



