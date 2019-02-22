import os
from flask import current_app, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.basemodel import Base


def set_global_sessionmaker():
    if "db_sessionmaker" not in g and "db_engine" not in g:
        g.db_engine = create_engine(current_app.config["SQLALCHEMY_DATABASE_URI"])
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
    db_status = True
    try:
        session.commit()
    except Exception:
        # TODO Logging.log.exception()
        session.rollback()
        session.flush()
        db_status = False
    session.close
    return db_status


def update_model_by_id(model, id, update_val):
    db_status = True
    session = get_db_session()
    # if .update() returns 1, good request, keep status True
    # if .update() returns 0/2, bad request, set status False
    db_status = 1 == session.query(model).filter(model.id == id).update(update_val)
    try:
        session.commit()
    except Exception:
        # TODO Logging.log.exception()
        session.rollback()
        session.flush()
        db_status = False
    session.close
    return db_status


def delete_model_by_id(model, id):
    session = get_db_session()
    session.query(model).filter(model.id == id).delete()
    db_status = True
    try:
        session.commit()
    except Exception:
        # TODO Logging.log.exception()
        session.rollback()
        session.flush()
        db_status = False
    session.close
    return db_status
