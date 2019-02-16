from flask import (
    Blueprint,
    flash,
    g,
    redirect,
    render_template,
    jsonify,
    request,
    session,
    url_for,
)
from sqlalchemy.orm import joinedload
from code.database.middleware import (
    get_models_by_id,
    get_all_of_model,
    insert_model,
    update_model_by_id,
    delete_model_by_id,
)
from code.json_encoder import AlchemyEncoder
from code.json_decoder import AlchemyDecoder
from models.models import LearningPoint


# This creats a Blueprint named blog, like application object the blueprint needs to know where it's defined so __name__ is passed as the second argument. The url_prefix will be prepended to all the URLs associated with the blueprint
bp = Blueprint("api.learning_point", __name__, url_prefix="/api/learning_point/")

# encoder that takes sqlalchemy class, converts to json object
json_en = AlchemyEncoder
# decoder that takes json object, converts to sqlalchemy class
json_de = AlchemyDecoder


model = LearningPoint


@bp.route("/<int:id>", methods=("GET",))
def view_one(id):
    from .blueprint_factory import view_one

    return view_one(model, id)


@bp.route("/", methods=("GET",))
def view_all():
    from .blueprint_factory import view_all

    return view_all(model)


@bp.route("/", methods=("POST",))
def update():
    request_data = request.get_json()
    if request_data is not None:
        # Do the json 'serialising'
        # id = auto incremented by DB
        # added_timestamp = auto set by db
        learning_point = LearningPoint()
        for field in dir(learning_point):
            setattr(learning_point, field, request_data[field])

        update_model_by_id(LearningPoint, id, learning_point)
    return "Add Learning Point"


@bp.route("/<int:id>", methods=("PUT",))
def update_point(id):
    request_data = request.get_json()
    if request_data is not None:
        # Do the json 'serialising'
        # id = auto incremented by DB
        # added_timestamp = auto set by db
        learning_point = LearningPoint()
        for field in dir(learning_point):
            setattr(learning_point, field, request_data[field])

        insert_model(learning_point)
    return "Update Learning Point"


@bp.route("/<int:id>", methods=("DELETE",))
def delete(id):
    return "Delete Learning Point"
