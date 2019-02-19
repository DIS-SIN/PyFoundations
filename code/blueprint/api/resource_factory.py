from flask import jsonify, request
from code.json_encoder import AlchemyEncoder
from code.database.middleware import (
    get_models_by_id,
    get_all_of_model,
    update_model_by_id,
    insert_model,
    delete_model_by_id,
)

json_en = AlchemyEncoder


def view_one(model, id):
    """Return a jsonified version of a model in a db that matches id

    first retreive model from the db
    if the return size is 0, or more than 1, return no data with a fail
    if the return size is 1, continue
        using an implimentation of flask.json.JSONEncoder, process model into json
        return jsonified model with a success
    """
    db_return = get_models_by_id(model, id)
    if len(db_return) == 1:
        return jsonify(
            [
                {
                    "api_data": json_en.default(json_en, db_return[0]),
                    "api_return": "success",
                }
            ]
        )
    return jsonify([{"api_return": "failure"}])


def view_all(model):
    """Return an array of jsonified versions of all models in a db

    first retreive all models from the db
    create an array to store jsonified version of each model
    for each model returned by the db
        using an implimentation of flask.json.JSONEncoder turn into json,
        add to the array
    return jsonified array with a success
    (if there are no models in the db it returns empty array with api_return:success)
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
    """Returns whether or not the user for the current session has permission to delete an object
    """
    return False  # TODO Real value


def delete_one(model, id):
    if __can_delete__():
        db_status = delete_model_by_id(model, id)
        if db_status:
            return jsonify([{"api_return": "success"}])
    return jsonify([{"api_return": "failure"}])
