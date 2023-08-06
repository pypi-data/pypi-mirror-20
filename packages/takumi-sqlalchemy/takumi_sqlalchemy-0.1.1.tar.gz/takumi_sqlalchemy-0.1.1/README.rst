takumi-sqlalchemy
=================
.. image:: https://travis-ci.org/elemepi/takumi-sqlalchemy.svg?branch=master
    :target: https://travis-ci.org/elemepi/takumi-sqlalchemy

Sqlachmey utilities for Takumi.

Example
-------

.. code-block:: python

    from takumi_config import config

    config.settings['DB_SETTINGS'] = {
        'test_db': {'dsn': 'sqlite:///:memory:'}
    }

    import sqlachmey as sa
    from takumi_sqlalchemy import db
    from sqlalchemy.ext.declarative import declarative_base

    Base = declarative_base()

    class User(Base):
        __tablename__ = 'user'

        id = sa.Column(sa.Integer, primary_key=True)
        name = sa.Column(sa.String(255))


    with db['test_db'] as session:
        session.query(User).all()
