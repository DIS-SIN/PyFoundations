from flask import jsonify
from code.json_encoder import AlchemyEncoder
from code.database.middleware import get_models_by_id, get_all_of_model

# encoder that takes sqlalchemy class, converts to json object
json_en = AlchemyEncoder


def view_one(model, id):
    # Get all models that match the id from the db
    db_return = get_models_by_id(model, id)

    # If we get one, continue, otherwise return a failure message
    if len(db_return) == 1:
        return jsonify(
            json_en.default(json_en, db_return[0]), {"api_return": "success"}
        )
    return jsonify({"api_return": "failure"})


def view_all(model):
    # Get all of the record of same type as model
    db_return = get_all_of_model(model)

    # array for constructing return value
    return_obj = []

    for obj in db_return:
        return_obj.append(json_en.default(json_en, obj))
    return jsonify(return_obj, {"api_return": "success"})
