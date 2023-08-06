Changelog
=========

1.2.6
-----

* Fix vnd_error_response returning a `Response` with wrong `Response.headers` type (youtux)
* Require flask version < 0.11, otherwise atilla won't work.
* Make a test pass also with the latest halogen version


1.2.4
-----

* accept remote address as host name if not passed by config (bubenkoff)

1.2.3
-----

* handle unauthorized requests correctly (bubenkoff)

1.2.2
-----

* correctly handle exception message (bubenkoff)

1.2.1
-----

* python3 support fixes (bubenkoff)

1.2.0
-----

* Initial public release (bubenkoff)
* Use flask-cache for request rate logging (bubenkoff)
* Add well-defined configuration defaults (bubenkoff)
* Code readability improvements (bubenkoff)
* Better test coverage (bubenkoff)

1.1.10
------

* Amended the previous fix and made the status code for commits configurable (hvdklauw)

1.1.9
-----

* Fixed transaction only being committed on 200 OK responses (olegpidsadnyi, hvdklauw)

1.1.8
-----

* Wider catch of werkzeug exceptions for halogen URI type deserialization (bubenkoff)

1.1.7
-----

* Correctly handle deserialization errors in ``atilla.ext.halogen.types.URI`` (bubenkoff)

1.1.6
-----

* Initial release
