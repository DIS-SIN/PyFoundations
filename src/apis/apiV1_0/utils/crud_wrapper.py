from flask import jsonify, request
from src.utils.json_encoder import AlchemyEncoder
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from src.database.utils.crud import (
    create_row,
    create_rows,
    read_row_by_id,
    read_rows,
    update_row_by_id,
    update_rows,
    delete_row_by_id,
    delete_rows,
)

json_en = AlchemyEncoder()


def get_one_row(model, id):
    """Return JSON representation of a row in a table
    first retreive mapped model from the db
    if the return size is 0, or more than 1, return no data with a fail
    if the return size is 1, continue
        using an implimentation of flask.json.JSONEncoder, process model into json
    Parameters
    ----------
    model
        sqlalchemy.ext.declarative.api.DeclativeMeta
        class that inherits the sqlalchemy.ext.declarative.Base, this is the class that is mapped to the data
    id
       int
       the primary key of the row selected
    Returns
    -------
    dict
       JSON serializable dict
    int
       HTTP status code of response
    """
    try:
        db_return = read_row_by_id(model, id).one()
        return json_en.default(db_return), 200
    except NoResultFound as e:
        return {"error": "no results found"}, 400
    except Exception as e:
        return {"error": repr(e)}, 500


def get_all_rows(model, filters=None):
    """Return JSON representation of all rows in a table 

    first retreive all models from the db
    create an array to store jsonified version of each model
    for each model returned by the db
        using an implimentation of flask.json.JSONEnsrcr turn into json,
        add to the array
    return jsonified array with a success
    (if there are no models in the db it returns empty array with api_return:success)

    Parameters
    ----------
    model
        sqlalchemy.ext.declarative.api.DeclativeMeta
        class that inherits the sqlalchemy.ext.declarative.Base, this is the class that is mapped to the data

    Returns
    ------
    dict
        JSON serializable dict
    int
        HTTP status code of response
    """
    try:
        ##OPTOMIZATION REMARK##
        # good candidate for parrallel processing as IO bound
        db_return = read_rows(model, filters)
        return_obj = []
        for row in db_return:
            return_obj.append(json_en.default(row))
        return return_obj, 200
    except Exception as e:
        return {"error": repr(e)}, 500


def update_one_row(model, id, updates):
    try:
        update_row_by_id(model, id, updates)
    except ValueError as e:
        return {"error": repr(e)}, 400
    except NoResultFound as e:
        return {"error": repr(e)}, 400
    except Exception as e:
        return {"error": repr(e)}, 500


def update_selected_rows(model, updates, filters=None):
    try:
        update_rows(model, updates, filters)
    except Exception as e:
        return {"error": repr(e)}, 500


def create_one_row(model):
    try:
        create_row(model)
        return {}, 200
    except Exception as e:
        return {"error": repr(e)}, 500


def create_multiple_rows(*models):
    try:
        create_rows(*models)
        return {}, 200
    except Exception as e:
        return {"error": repr(e)}, 500


def delete_one_row(model, id):
    try:
        delete_row_by_id(model, id)
        return {}, 200
    except NoResultFound as e:
        return {"error": repr(e)}, 400
    except Exception as e:
        return {"error": repr(e)}, 500


def delete_selected_row(model, filters=None):
    try:
        delete_rows(model, filters)
        return {}, 200

    except NoResultFound as e:
        return {"error": repr(e)}, 400
    except Exception as e:
        return {"error": repr(e)}, 500
