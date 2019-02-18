from flask_restful import Resource
from models.models import LearningPoint

model = LearningPoint


class LearningPointResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_one

        return view_one(model, id)


class AllLearningPointResource(Resource):
    def get(self):
        from .blueprint_factory import view_all

        return view_all(model)


# @bp.route("/", methods=("POST",))
# def update():
#     request_data = request.get_json()
#     if request_data is not None:
#         # Do the json 'serialising'
#         # id = auto incremented by DB
#         # added_timestamp = auto set by db
#         learning_point = LearningPoint()
#         for field in dir(learning_point):
#             setattr(learning_point, field, request_data[field])
#
#         update_model_by_id(LearningPoint, id, learning_point)
#     return "Add Learning Point"
#
#
# @bp.route("/<int:id>", methods=("PUT",))
# def update_point(id):
#     request_data = request.get_json()
#     if request_data is not None:
#         # Do the json 'serialising'
#         # id = auto incremented by DB
#         # added_timestamp = auto set by db
#         learning_point = LearningPoint()
#         for field in dir(learning_point):
#             setattr(learning_point, field, request_data[field])
#
#         insert_model(learning_point)
#     return "Update Learning Point"
#
#
# @bp.route("/<int:id>", methods=("DELETE",))
# def delete(id):
#     return "Delete Learning Point"
#

