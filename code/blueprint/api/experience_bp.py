from flask import Blueprint
from models.models import Experience


bp = Blueprint("api.experience", __name__, url_prefix="/api/experience/")

model = Experience


@bp.route("/<int:id>", methods=("GET",))
def view_one(id):
    from .blueprint_factory import view_one

    return view_one(model, id)


@bp.route("/", methods=("GET",))
def view_all():
    from .blueprint_factory import view_all

    return view_all(model)
