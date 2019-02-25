from src.database.db import get_db_session
# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_models_by_id(model, id):
    session, _ = get_db_session()
    results = session.query(model).filter(model.id == id).all()
    return results


# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_all_of_model(model):
    session, _ = get_db_session()
    results = session.query(model).all()
    return results


# Insert a new record in the database, for the sqlalchemy object matching
# the type of the model parameter
def insert_model(model):
    session, _ = get_db_session()
    session.add(model)
    db_status = True
    try:
        session.commit()
        session.flush()
    except Exception as e:
        # TODO Logging.log.exception()
        print(repr(e))
        session.rollback()
        session.flush()
        db_status = False
    return db_status


def update_model_by_id(model, id, update_val):
    db_status = True
    session, _ = get_db_session()
    # if .update() returns 1, good request, keep status True
    # if .update() returns 0/2, bad request, set status False
    db_status = 1 == session.query(model).filter(model.id == id).update(update_val)
    try:
        session.commit()
        session.flush()
    except Exception:
        # TODO Logging.log.exception()
        session.rollback()
        session.flush()
        db_status = False
    session.close
    return db_status


def delete_model_by_id(model, id):
    session, _ = get_db_session()
    session.query(model).filter(model.id == id).delete()
    db_status = True
    try:
        session.commit()
        session.flush()
    except Exception:
        # TODO Logging.log.exception()
        session.rollback()
        session.flush()
        db_status = False
    session.close
    return db_status