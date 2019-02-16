from flask import Blueprint
from models.models import User


# This creats a Blueprint named blog, like application object the blueprint needs to know where it's defined so __name__ is passed as the second argument. The url_prefix will be prepended to all the URLs associated with the blueprint
bp = Blueprint("api.user", __name__, url_prefix="/api/user/")

model = User


@bp.route("/<int:id>", methods=("GET",))
def view_one(id):
    from .blueprint_factory import view_one

    return view_one(model, id)


@bp.route("/", methods=("GET",))
def view_all():
    from .blueprint_factory import view_all

    return view_all(model)
