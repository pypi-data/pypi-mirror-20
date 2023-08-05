uData
=====





.. image:: https://readthedocs.org/projects/udata/badge/?version=v1.0.1
    :target: https://udata.readthedocs.io/en/v1.0.1/
    :alt: Read the documentation

.. image:: https://badges.gitter.im/Join%20Chat.svg
    :target: https://gitter.im/opendatateam/udata
    :alt: Join the chat at https://gitter.im/opendatateam/udata


Customizable and skinnable social platform dedicated to (open)data.

The `full documentation <https://udata.readthedocs.io/en/v1.0.1/>`_ is hosted on Read the Docs.

.. _circleci-url: https://circleci.com/gh/opendatateam/udata
.. _circleci-badge: https://circleci.com/gh/opendatateam/udata.svg?style=shield
.. _requires-io-url: https://requires.io/github/opendatateam/udata/requirements/?tag=1.0.1
.. _requires-io-badge: https://requires.io/github/opendatateam/udata/requirements.svg?tag=1.0.1
.. _david-dm-url: https://david-dm.org/opendatateam/udata
.. _david-dm-badge: https://img.shields.io/david/opendatateam/udata.svg
.. _david-dm-dev-url: https://david-dm.org/opendatateam/udata#info=devDependencies
.. _david-dm-dev-badge: https://david-dm.org/opendatateam/udata/dev-status.svg
.. _gitter-badge: https://badges.gitter.im/Join%20Chat.svg
.. _gitter-url: https://gitter.im/opendatateam/udata
.. _readthedocs-badge: https://readthedocs.org/projects/udata/badge/?version=v1.0.1
.. _readthedocs-url: https://udata.readthedocs.io/en/v1.0.1/

Changelog
=========

1.0.1 (2017-02-16)
------------------

- Pin PyMongo version (only compatible with PyMongo 3+)

1.0.0 (2017-02-16)
------------------

Breaking Changes
****************

* 2016-05-11: Upgrade of ElasticSearch from 1.7 to 2.3 `#449 <https://github.com/opendatateam/udata/pull/449>`_

You have to re-initialize the index from scratch, not just use the `reindex` command given that ElasticSearch 2+ doesn't provide a way to `delete mappings <https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-delete-mapping.html>`_ anymore. The command is `udata search init` and may take some time given the amount of data you are dealing with.

* 2017-01-18: User search and listing has been removed (privacy concern)

New & Improved
**************

* 2017-01-06: Add some dataset ponderation factor: temporal coverage, spatial coverage,
  certified provenance and more weight for featured ones. Need reindexation to be taken into account.

* 2016-12-20: Use all the `Dublin Core Frequencies <http://dublincore.org/groups/collections/frequency/>`_
  plus some extra frequencies.

* 2016-12-01: Add the possibility for a user to delete its account in the admin interface

In some configurations, this feature should be deactivated, typically when
there is an SSO in front of udata which may cause some inconsistencies. In
that case, the configuration parameter DELETE_ME should be set to False (True
by default).

* 2016-05-12: Add fields masks to reduce API payloads `#451 <https://github.com/opendatateam/udata/pull/451>`_

The addition of `fields masks <http://flask-restplus.readthedocs.io/en/stable/mask.html>`_ in Flask-RESTPlus allows us to reduce the retrieved payload within the admin — especially for datasets — and results in a performances boost.

Fixes
*****

* 2016-11-29: Mark active users as confirmed `#619 <https://github.com/opendatateam/udata/pull/618>`_
* 2016-11-28: Merge duplicate users `#617 <https://github.com/opendatateam/udata/pull/617>`_
  (A reindexation is necessary after this migration)

Deprecation
***********

Theses are deprecated and support will be removed in some feature release.
See `Deprecation Policy <https://udata.readthedocs.io/en/stable/versionning/#deprecation-policy>`_.

* Theses frequencies are deprecated for their Dublin Core counter part:
    * `fortnighly` ⇨ `biweekly`
    * `biannual` ⇨ `semiannual`
    * `realtime` ⇨ `continuous`


0.9.0 (2017-01-10)
------------------

- First published version



