cone.sql.model
==============

Imports.

.. code-block:: pycon

    >>> from cone.app import get_root
    >>> from cone.sql import get_session
    >>> from cone.sql.model import GUID
    >>> from cone.sql.model import SQLRowNode
    >>> from cone.sql.model import SQLTableNode
    >>> from cone.sql import testing
    >>> from cone.sql.testing import IntegerAsPrimaryKeyRecord
    >>> from cone.sql.testing import StringAsPrimaryKeyRecord
    >>> from cone.sql.testing import UUIDAsPrimaryKeyRecord
    >>> from sqlalchemy.engine import default
    >>> import cone.app
    >>> import uuid


Platform independent GUID data type
-----------------------------------

Define a dummy dialect.

.. code-block:: pycon

    >>> class DummyDialect(default.DefaultDialect):
    ...     name = None

    >>> dialect = DummyDialect()

Instanciate ``GUID`` data type.

.. code-block:: pycon

    >>> guid = GUID()

Test ``load_dialect_impl``.

.. code-block:: pycon

    >>> dialect.name = 'postgresql'
    >>> guid.load_dialect_impl(dialect)
    UUID()

    >>> dialect.name = 'other'
    >>> guid.load_dialect_impl(dialect)
    CHAR(length=32)

Test ``process_bind_param``.

.. code-block:: pycon

    >>> dialect.name = 'postgresql'
    >>> guid.process_bind_param(None, dialect)

    >>> value = uuid.UUID('d8f1d964-9f2f-4df5-9f30-c5a90052576d')
    >>> guid.process_bind_param(value, dialect)
    'd8f1d964-9f2f-4df5-9f30-c5a90052576d'

    >>> dialect.name = 'other'
    >>> guid.process_bind_param(value, dialect)
    'd8f1d9649f2f4df59f30c5a90052576d'

    >>> value = str(value)
    >>> guid.process_bind_param(value, dialect)
    'd8f1d9649f2f4df59f30c5a90052576d'

Test ``process_result_value``.

.. code-block:: pycon

    >>> guid.process_result_value(None, dialect)

    >>> guid.process_result_value(value, dialect)
    UUID('d8f1d964-9f2f-4df5-9f30-c5a90052576d')


UUID as primary key
-------------------

Define nodes.

.. code-block:: pycon

    >>> class UUIDAsKeyNode(SQLRowNode):
    ...     record_class = UUIDAsPrimaryKeyRecord

    >>> class UUIDAsKeyContainer(SQLTableNode):
    ...     record_class = UUIDAsPrimaryKeyRecord
    ...     child_factory = UUIDAsKeyNode

Resgister entry.

.. code-block:: pycon

    >>> cone.app.register_entry('uuid_as_key_container', UUIDAsKeyContainer)

Get container from root.

.. code-block:: pycon

    >>> root = get_root()
    >>> container = root['uuid_as_key_container']
    >>> container
    <UUIDAsKeyContainer object 'uuid_as_key_container' at ...>

Add node to container.

.. code-block:: pycon

    >>> node_uid = '6090411e-d249-4dc6-9da1-74172919f1ed'
    >>> node = container[node_uid] = UUIDAsKeyNode()
    >>> node.attrs['field'] = u'Value'

Persist data.

.. code-block:: pycon

    >>> container()

Query data record using SQLAlchemy directly.

.. code-block:: pycon

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(UUIDAsPrimaryKeyRecord).get(uuid.UUID(node_uid))
    <cone.sql.testing.UUIDAsPrimaryKeyRecord object at ...>

Get children via node API.

.. code-block:: pycon

    >>> items = container.items()
    >>> items
    [('6090411e-d249-4dc6-9da1-74172919f1ed', 
    <UUIDAsKeyNode object '6090411e-d249-4dc6-9da1-74172919f1ed' at ...>)]

    >>> container['6090411e-d249-4dc6-9da1-74172919f1ed'].attrs.items()
    [('uid_key', UUID('6090411e-d249-4dc6-9da1-74172919f1ed')), 
    ('field', u'Value')]


String as primary key
---------------------

Define nodes.

.. code-block:: pycon

    >>> class StringAsKeyNode(SQLRowNode):
    ...     record_class = StringAsPrimaryKeyRecord

    >>> class StringAsKeyContainer(SQLTableNode):
    ...     record_class = StringAsPrimaryKeyRecord
    ...     child_factory = StringAsKeyNode

Resgister entry.

.. code-block:: pycon

    >>> cone.app.register_entry(
    ...     'string_as_key_container',
    ...     StringAsKeyContainer
    ... )

Get container from root.

.. code-block:: pycon

    >>> container = root['string_as_key_container']
    >>> container
    <StringAsKeyContainer object 'string_as_key_container' at ...>

Add node to container.

.. code-block:: pycon

    >>> node = container[u'key'] = StringAsKeyNode()
    >>> node.attrs['field'] = u'Value'

Persist data.

.. code-block:: pycon

    >>> container()

Query data record using SQLAlchemy directly.

.. code-block:: pycon

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(StringAsPrimaryKeyRecord).get(u'key')
    <cone.sql.testing.StringAsPrimaryKeyRecord object at ...>

Get children via node API.

.. code-block:: pycon

    >>> items = container.items()
    >>> items
    [('key', <StringAsKeyNode object 'key' at ...>)]

    >>> container['key'].attrs.items()
    [('string_key', u'key'), ('field', u'Value')]


Integer as primary key
----------------------

Define nodes.

.. code-block:: pycon

    >>> class IntegerAsKeyNode(SQLRowNode):
    ...     record_class = IntegerAsPrimaryKeyRecord

    >>> class IntegerAsKeyContainer(SQLTableNode):
    ...     record_class = IntegerAsPrimaryKeyRecord
    ...     child_factory = IntegerAsKeyNode

Resgister entry.

.. code-block:: pycon

    >>> cone.app.register_entry(
    ...     'integer_as_key_container',
    ...     IntegerAsKeyContainer
    ... )

Get container from root.

.. code-block:: pycon

    >>> container = root['integer_as_key_container']
    >>> container
    <IntegerAsKeyContainer object 'integer_as_key_container' at ...>

Add node to container.

.. code-block:: pycon

    >>> node = container['1234'] = IntegerAsKeyNode()
    >>> node.attrs['field'] = u'Value'

Persist data.

.. code-block:: pycon

    >>> container()

Query data record using SQLAlchemy directly.

.. code-block:: pycon

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(IntegerAsPrimaryKeyRecord).get('1234')
    <cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>

Get children via node API.

.. code-block:: pycon

    >>> items = container.items()
    >>> items
    [('1234', <IntegerAsKeyNode object '1234' at ...>)]

    >>> container['1234'].attrs.items()
    [('integer_key', 1234), ('field', u'Value')]


Model API Tests
---------------

SQLAlchemy data types for primary keys can be extended on
``data_type_converters``.

.. code-block:: pycon

    >>> sorted(
    ...     SQLTableNode.data_type_converters.items(),
    ...     key=lambda x: x[0].__name__
    ... )
    [(<class 'cone.sql.model.GUID'>, <class 'uuid.UUID'>), 
    (<class 'sqlalchemy...Integer'>, <type 'int'>), 
    (<class 'sqlalchemy...String'>, <type 'unicode'>)]

``__getitem__`` and ``__setitem__`` raise a ``KeyError`` if node name cannot
be converted to primary key data type.

.. code-block:: pycon

    >>> container = root['integer_as_key_container']
    >>> container['a']
    Traceback (most recent call last):
      ...
    KeyError: "Failed to convert node name to expected primary key data type: 
    invalid literal for int() with base 10: 'a'"

    >>> container['a'] = IntegerAsKeyNode()
    Traceback (most recent call last):
      ...
    KeyError: "Failed to convert node name to expected primary key data type: 
    invalid literal for int() with base 10: 'a'"

If primary key attribute is set on node and given name on ``__setitem__`` not
matches attribute value, a ``KeyError`` is thrown.

.. code-block:: pycon

    >>> child = IntegerAsKeyNode()
    >>> child.attrs['integer_key'] = 123
    >>> container['124'] = child
    Traceback (most recent call last):
      ...
    KeyError: 'Node name must match primary key attribute value: 124 != 123'

Access inexistent child.

.. code-block:: pycon

    >>> container['124']
    Traceback (most recent call last):
      ...
    KeyError: '124'

If primary key attribute not set, it gets automatically set by name on
``__setitem__``.

.. code-block:: pycon

    >>> child = IntegerAsKeyNode()
    >>> container['123'] = child
    >>> child.attrs.items()
    [('integer_key', 123), ('field', None)]

SQL model column values can be accessed and set via ``attrs``.

.. code-block:: pycon

    >>> child.attrs['field'] = u'Value'
    >>> child.attrs.items()
    [('integer_key', 123), ('field', u'Value')]

SQL model gets persisted on ``__call__``.

.. code-block:: pycon

    >>> container()

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(IntegerAsPrimaryKeyRecord).all()
    [<cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>, 
    <cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>]

Override child.

.. code-block:: pycon

    >>> child = IntegerAsKeyNode()
    >>> child.attrs['field'] = u'Other Value'
    >>> container['123'] = child
    >>> child.attrs.items()
    [('integer_key', 123), ('field', u'Other Value')]

    >>> container()
    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(IntegerAsPrimaryKeyRecord).all()
    [<cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>, 
    <cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>]

Delete child.

.. code-block:: pycon

    >>> del container['123']

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(IntegerAsPrimaryKeyRecord).all()
    [<cone.sql.testing.IntegerAsPrimaryKeyRecord object at ...>]

Update Child.

.. code-block:: pycon

    >>> child = container['1234']
    >>> child.attrs['field'] = u'Updated Value'

    >>> child()

    >>> request = layer.new_request()
    >>> session = get_session(request)
    >>> session.query(IntegerAsPrimaryKeyRecord).first().field
    u'Updated Value'

Other than most other node implementations, ``TableRowNodes`` can be persisted
without being hooked up to the tree directly.

.. code-block:: pycon

    >>> child = IntegerAsKeyNode()
    >>> child.attrs['integer_key'] = 1235
    >>> child.attrs['field'] = u'Value'
    >>> child()

    >>> container.items()
    [('1234', <IntegerAsKeyNode object '1234' at ...>), 
    ('1235', <IntegerAsKeyNode object '1235' at ...>)]

Access inexisting attributes.

.. code-block:: pycon

    >>> child.attrs['inexistent']
    Traceback (most recent call last):
      ...
    KeyError: 'Unknown attribute: inexistent'

    >>> child.attrs['inexistent'] = 'Value'
    Traceback (most recent call last):
      ...
    KeyError: 'Unknown attribute: inexistent'

SQL row node attributes cannot be deleted.

.. code-block:: pycon

    >>> del child.attrs['field']
    Traceback (most recent call last):
      ...
    KeyError: 'Deleting of attributes not allowed'

SQL row node is a leaf thus containment API always raises KeyError and iter
returns empty result.

.. code-block:: pycon

    >>> child['foo'] = 'foo'
    Traceback (most recent call last):
      ...
    KeyError: 'foo'

    >>> child['foo']
    Traceback (most recent call last):
      ...
    KeyError: 'foo'

    >>> del child['foo']
    Traceback (most recent call last):
      ...
    KeyError: 'foo'

    >>> list(iter(child))
    []

Test ``sql_session_setup``. The SQL session setup handler is defined in
``cone.sql.testing`` and registers a callback to ``after_flush`` event.
Patch desired callback reference and test whether it's called.

.. code-block:: pycon

    >>> def callback(session, flush_context):
    ...     print session, flush_context

    >>> testing.test_after_flush = callback

    >>> container['1235'].attrs['field'] = u'Changed Value'
    >>> container()
    <sqlalchemy.orm.session.Session object at ...> 
    <sqlalchemy.orm.unitofwork.UOWTransaction object at ...>

    >>> testing.test_after_flush = None
