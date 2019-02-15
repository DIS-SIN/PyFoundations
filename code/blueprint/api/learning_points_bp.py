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
from models.learning_point import LearningPoint
from models.tags import Tag


# This creats a Blueprint named blog, like application object the blueprint needs to know where it's defined so __name__ is passed as the second argument. The url_prefix will be prepended to all the URLs associated with the blueprint
bp = Blueprint("api.learning_point", __name__, url_prefix="/api/learning_point/")

# encoder that takes sqlalchemy class, converts to json object
json_en = AlchemyEncoder
# decoder that takes json object, converts to sqlalchemy class
json_de = AlchemyDecoder


def valid_request(request_data):
    for field in LearningPoint.__json__(LearningPoint):
        try:
            if request_data[field] is None:
                return False
        except KeyError:
            return False
    return True


@bp.route("/", methods=("GET",))
def view_all():
    # Get all learning points that match the id
    l_ps = get_all_of_model(LearningPoint)

    return_l_ps = []

    for l_p in l_ps:
        # create array for working with the tags
        tags = []
        # for each of the tags associated with this lp
        # format it to JSON, then add to array
        for tag in l_p.tags:
            tags.append(json_en.default(json_en, tag))

        return_l_p = json_en.default(json_en, l_p)
        return_l_p["tags"] = tags
        return_l_ps.append(return_l_p)

    return jsonify(return_l_ps)


@bp.route("/<int:id>", methods=("GET",))
def view_one(id):
    # Get all learning points that match the id
    all_l_ps = get_models_by_id(LearningPoint, id)

    # If we get one, continue, otherwise redirect to home
    if len(all_l_ps) == 1:

        # re aliase learning point, easier to work with
        l_p = all_l_ps[0]

        # create array for working with the tags
        tags = []
        # for each of the tags associated with this lp
        # format it to JSON, then add to array
        for tag in l_p.tags:
            tags.append(json_en.default(json_en, tag))

        # format the learning point class to JSON
        ret_val = json_en.default(json_en, l_p)

        # add the JSON tag array to JSON learning point
        ret_val["tags"] = tags

        # return our formatted json
        return jsonify(ret_val)
    # if either 0 or multiple learning points that match our id, redirect home
    # TODO Change HTTP status code, should it be 40X?
    return redirect(url_for("index"))


@bp.route("/", methods=("POST",))
def update():
    request_data = request.get_json()
    if request_data is not None and valid_request(request_data):
        # Do the json 'serialising'
        # id = auto incremented by DB
        # added_timestamp = auto set by db
        learning_point = LearningPoint()
        for field in [x for x in LearningPoint.__json__(LearningPoint) if x != "tags"]:
            setattr(learning_point, field, request_data[field])

        tags = []
        for tag in request_data["tags"]:
            tags.append(Tag(tag=tag["tag"]))
        setattr(learning_point, "tags", tags)

        insert_model(learning_point)
    return "Add Learning Point"


@bp.route("/<int:id>", methods=("PUT",))
def update_post(id):
    return "Update Learning Point"


@bp.route("/<int:id>", methods=("DELETE",))
def delete(id):
    return "Delete Learning Point"
