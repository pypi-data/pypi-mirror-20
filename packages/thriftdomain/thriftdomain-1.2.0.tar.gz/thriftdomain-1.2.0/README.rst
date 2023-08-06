thriftdomain --- a Sphinx domain for documenting Thrift APIs
============================================================

This domain provides two things:

1. Directive/role grammar for documenting Thrift APIs.
2. A ``multisource`` directive for including example source code for
   different languages in the same block.


Usage
-----

Include ``thriftdomain`` in your ``conf.py``. The following
configuration options are not required by encouraged for legibility::

  add_module_names = False  # Don't include API names before service, struct, etc.


Directives and roles
--------------------

The domain grammar is based very closely off of the builtin Python
domain. All available directives and roles can be found in
``test/index.rst``

Instead of *modules*, Thrift namespaces are separted by *api*. An API
is simply a set of services and supporting types (structs, enums,
etc.). It is most common to have a single API, though you may have
more than one, incompatible versions of the same one, etc.

Instead of *classes*, Thrift has *services*. You can reference service
methods in the same way as class methods in Python. Additional
directives exist for enums, constants, typedefs, structs, and
exceptions.


Code samples
------------

You can also use the ``multisource`` directive in place of a normal
``code-block`` if you want to provide examples for multiple
languages. An example can be found in ``test/index.rst``; uses
EasyTabs_.


TODO
----

* Support linking to fields inside collections (``list<MyStruct>``)


.. _EasyTabs: http://os.alfajango.com/easytabs/
