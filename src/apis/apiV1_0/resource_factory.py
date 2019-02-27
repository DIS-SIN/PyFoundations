from flask import jsonify, request
from src.utils.json_encoder import AlchemyEncoder
from  sqlalchemy.orm.exc import NoResultsFound, MultipleResultsFound
from src.database.utils.crud import (
    get_row_by_id,
    get_all_of_model,
    update_model_by_id,
    insert_model,
    delete_model_by_id,
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
    """
    try:
        db_return = get_row_by_id(model, id)
        return json_en.default(db_return)
    except NoResultsFound as e:
        return {'error': repr(e)},400
    except MultipleResultsFound as e:
        return {'error': repr(e)}, 500
    except TypeError as e:
        return {'error': repr(e)}, 500
def get_all_rows(model):
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
    """
    db_return = get_all_of_model(model)
    return_obj = []
    for obj in db_return:
        return_obj.append(json_en.default(json_en, obj))
    return jsonify([{"api_data": return_obj, "api_return": "success"}])


def update_one(model, id, object_name):
    request_data = request.get_json()
    if request_data[object_name] is not None:
        db_status = update_model_by_id(model, id, request_data[object_name])
        if db_status:
            return jsonify([{"api_return": "success"}])
    return jsonify([{"api_return": "failure"}])


def insert_one(model, object_name):
    request_data = request.get_json()
    if request_data[object_name] is not None:
        new_model = model(**request_data[object_name])
        db_status = insert_model(new_model)
        if db_status:
            return jsonify([{"api_return": "success"}])
    return jsonify([{"api_return": "failure"}])


def __can_delete__():
    """Returns whether or not the requirements to delete have been met
    """
    return False  # TODO Real value


def delete_one(model, id):
    if __can_delete__():
        db_status = delete_model_by_id(model, id)
        if db_status:
            return jsonify([{"api_return": "success"}])
    return jsonify([{"api_return": "failure"}])
