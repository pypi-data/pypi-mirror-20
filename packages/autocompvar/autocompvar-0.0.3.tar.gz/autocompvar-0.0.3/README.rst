.. image:: https://travis-ci.org/MacHu-GWU/autocompvar-project.svg?branch=master

.. image:: https://img.shields.io/pypi/v/autocompvar.svg

.. image:: https://img.shields.io/pypi/l/autocompvar.svg

.. image:: https://img.shields.io/pypi/pyversions/autocompvar.svg


Welcome to autocompvar Documentation
===============================================================================
In most of the case, put constant value in your code. Because when you see the value, you don't know what does that mean in behind. A better way is to define a constant, and use that constant variable.

But sometimes, you have a great amount of constant, and you need to put that in your code anywhere. It's really hard to remember all constant name. Especially, sometimes they are nested.

``autocompvar`` allows developer to create a Constant def script from data, and then you don't need to remember anything anymore.


**Quick Links**
-------------------------------------------------------------------------------
- `GitHub Homepage <https://github.com/MacHu-GWU/autocompvar-project>`_
- `Online Documentation <http://pythonhosted.org/autocompvar>`_
- `PyPI download <https://pypi.python.org/pypi/autocompvar>`_
- `Install <install_>`_
- `Issue submit and feature request <https://github.com/MacHu-GWU/autocompvar-project/issues>`_
- `API reference and source code <http://pythonhosted.org/autocompvar/py-modindex.html>`_


**Example**
-------------------------------------------------------------------------------
Suppose you have a RPG game. You need to write some application that query stuff using item id. But the hell is to remember what is what! If you just use constant, then your code is unmaintainable!

.. code-block:: console

    ItemType
    |--- Weapon: subclass_id=1, name=weapon
        |--- Sword: id=1, name=sword
        |--- Dagger: id=2, name=dagger
    |--- Armor: subclass_id=2, name=armor
        |--- Plate: id=1, name=plate
        |--- Cloth: id=2, name=cloth

Ideally, you want this:

.. code-block:: python

    # define your constant here
    >>> from itemtype import itemtype
    
    # when you type itemtype.name, it gives you all available subclass
    # when you type itemtype.name____weapon, it gives you all attributes
    >>> itemtype.name____weapon.subclass_id
    1

    >>> itemtype.name____weapon.name____dagger.id
    2

    # or you can use a function interface to program that
    >>> itemtype.name____armor.getattr_by_id(2).name
    cloth


Real Code
-------------------------------------------------------------------------------
(**Code example can be found at**: https://github.com/MacHu-GWU/autocompvar-project/blob/master/example.py)

First, import autocompvar, prepare your data, and generate code.

.. code-block:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    from __future__ import print_function
    from autocompvar.metadata import gen_code

    # classname
    # attrs: all attributes you need to define
    # keys: indexable attributes, like int, string field that are unique
    # data: the data to create instance of this class
    # collection: subclass list
    data = {
        "classname": "ItemType",
        "attrs": [],
        "collection": [
            {
                "classname": "SubClass",
                "attrs": ["id", "name"],
                "keys": ["name"],
                "data": {"id": 1, "name": "weapon"},
                "collection": [
                    {
                        "classname": "Weapon",
                        "attrs": ["id", "name"],
                        "keys": ["name"],
                        "data": {"id": 1, "name": "sword"},
                    },
                    {
                        "classname": "Weapon",
                        "attrs": ["id", "name"],
                        "keys": ["name"],
                        "data": {"id": 2, "name": "dagger"},
                    },
                ],
            },
            {
                "classname": "SubClass",
                "attrs": ["id", "name"],
                "keys": ["name"],
                "data": {"id": 2, "name": "armor"},
                "collection": [
                    {
                        "classname": "Armor",
                        "attrs": ["id", "name"],
                        "keys": ["name"],
                        "data": {"id": 1, "name": "plate"},
                    },
                    {
                        "classname": "Armor",
                        "attrs": ["id", "name"],
                        "keys": ["name"],
                        "data": {"id": 2, "name": "armor"},
                    },
                ],
            },
        ],
    }

    code = gen_code(data)
    print(code)

Then you have a importable script that able to do ``from your_module import item_type``:

.. code-block:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    from autocompvar.base import Base

    class ItemType(Base):
        __attrs__ = []
        __keys__ = []

        def __init__(self):
            pass
            

    class SubClass(Base):
        __attrs__ = ['id', 'name']
        __keys__ = ['name']

        def __init__(self, id=None, name=None):
            self.id = id
            self.name = name
            

    class Weapon(Base):
        __attrs__ = ['id', 'name']
        __keys__ = ['name']

        def __init__(self, id=None, name=None):
            self.id = id
            self.name = name
            

    class Armor(Base):
        __attrs__ = ['id', 'name']
        __keys__ = ['name']

        def __init__(self, id=None, name=None):
            self.id = id
            self.name = name
            


    item_type = ItemType()

    sub_class_name_weapon = SubClass(name='weapon', id=1)

    weapon_name_sword = Weapon(name='sword', id=1)
    sub_class_name_weapon.name____sword = weapon_name_sword

    weapon_name_dagger = Weapon(name='dagger', id=2)
    sub_class_name_weapon.name____dagger = weapon_name_dagger
    item_type.name____weapon = sub_class_name_weapon

    sub_class_name_armor = SubClass(name='armor', id=2)

    armor_name_plate = Armor(name='plate', id=1)
    sub_class_name_armor.name____plate = armor_name_plate

    armor_name_armor = Armor(name='armor', id=2)
    sub_class_name_armor.name____armor = armor_name_armor
    item_type.name____armor = sub_class_name_armor


Now you can easily with any constant like this:

.. code-block:: python

    >>> print(item_type.name____weapon.name____sword.id)
    1
    >>> print(item_type.name____armor.name____cloth.name)
    cloth


.. _install:

Install
-------------------------------------------------------------------------------

``autocompvar`` is released on PyPI, so all you need is:

.. code-block:: console

    $ pip install autocompvar

To upgrade to latest version:

.. code-block:: console

    $ pip install --upgrade autocompvar