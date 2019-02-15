import functools
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
from code.database.middleware import (
    get_models_by_id,
    insert_model,
    update_model_by_id,
    delete_model_by_id,
    get_all_of_model,
)
from models.tags import Tag
from models.learning_point import LearningPoint
from code.json_encoder import AlchemyEncoder


# This creats a Blueprint named blog, like application object the blueprint needs to know where it's defined so __name__ is passed as the second argument. The url_prefix will be prepended to all the URLs associated with the blueprint
bp = Blueprint("api.tag", __name__, url_prefix="/api/tag/")

# encoder that takes sqlalchemy class, converts to json object
json_en = AlchemyEncoder


@bp.route("/", methods=("GET",))
def all_tags():
    db_return = get_all_of_model(Tag)

    return_tags = []

    for tag in db_return:
        return_tags.append(tag.__to_json__())

    return jsonify(return_tags)


@bp.route("/<int:id>", methods=("GET",))
def view(id):
    db_return = get_models_by_id(Tag, id)
    if len(db_return) == 1:
        return jsonify(db_return[0].__to_json__())
    return redirect(url_for("index"))


@bp.route("/", methods=("POST",))
def update():
    request_data = request.get_json()
    if request_data is not None:
        # Do the json reading
        # id = auto incremented by DB
        # added_timestamp = auto set by db
        new_tag = Tag(tag=request_data["tag"])
        insert_model(new_tag)
    return redirect(url_for("index"))


@bp.route("/<int:id>", methods=("PUT",))
def update_post(id):
    request_data = request.get_json()
    if request_data is not None:
        update_val = {Tag.tag: request_data["tag"]}
        update_model_by_id(Tag, id, update_val)
    return redirect(url_for("index"))


@bp.route("/<int:id>", methods=("DELETE",))
def delete(id):
    delete_model_by_id(Tag, id)
    return redirect(url_for("index"))
