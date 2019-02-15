import os
from flask import current_app, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.basemodel import Base


def set_global_sessionmaker():
    if "db_sessionmaker" not in g and "db_engine" not in g:
        g.db_engine = create_engine(
            current_app.config["DATABASE"], echo=True
        )  # , echo=True
        Base.metadata.bind = g.db_engine
        g.db_sessionmaker = sessionmaker(bind=g.db_engine)


def get_db_session():
    set_global_sessionmaker()
    return g.db_sessionmaker()


def close_db(e=None):
    g.db_engine.dispose()


# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_models_by_id(model, id):
    session = get_db_session()
    results = session.query(model).filter(model.id == id).all()
    session.close()
    return results


# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_all_of_model(model):
    session = get_db_session()
    results = session.query(model).all()
    session.close()
    return results


# Insert a new record in the database, for the sqlalchemy object matching
# the type of the model parameter
def insert_model(model):
    session = get_db_session()
    session.add(model)
    session.commit()
    session.close()


def update_model_by_id(model, id, update_val):
    session = get_db_session()
    session.query(model).filter(model.id == id).update(update_val)
    session.commit()
    session.close


def delete_model_by_id(model, id):
    session = get_db_session()
    session.query(model).filter(model.id == id).delete()
    session.commit()
    session.close()