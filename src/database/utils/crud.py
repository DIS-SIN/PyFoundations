from src.database.db import get_db_session
# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_row_by_id(model, id):
    """
    get one row by it's primary key id



    """
    session, _ = get_db_session()
    results = session.query(model).filter(model.id == id).one()
    return results


# Query the database for a type matching model (tag, experience, etc)
# that has the same id as the parameter id
def get_rows(model, filters = None, default_join = "and"):
    """
    get all rows from model where the criteria in the kwargs is met

    Parameters
    ----------
    model 
        sqlalchemy.ext.declarative.api.DeclativeMeta
    filters
        dict
        filters dict must be in the following structure
        [  {
                'column': {
                    'comparitor': '>=' OR '==' OR '<=' OR '>' OR '<' OR !=
                    'data': str OR int OR float  
                },
                join = "and" OR "or"
            }
        ]
    """
    if filters is not None:
        #array which will con
        query = ParseTree(model,filters)
        results = query.query()
        return results.all()
        if default_join != 'and' and default_join != 'or':
            raise ValueError("default_join must be of value 'and' or 'or' ")
        if isinstance(filters, list):
            #get operators
            joins = []
            for filt in filters:
                join = filt.get('join')
                if join is None:
                    joins.append(default_join)
                if join == 'and' or join == 'or':
                    joins.append(join)
                else:
                    raise ValueError("join key in filters must be of value 'and' or 'or'")
            
            #get a list of the keys in the filters dict, these are the columns in the model
            column_filters = list(filters.keys())
            #loop through these columns
            for column in column_filters:
                #check if the attribute is valid by getting the attribute, this will 
                #throws an AttributeError if it doesn't exist
                model.__getattribute__(column)
                #check if the data attribute is a list and if it is loop over the data
                if isinstance(filters[column]['data'], list):
                    for sub_val in filters[column]['data']:

                
        else:
            raise TypeError('type of filters argument must be of type list')
        
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