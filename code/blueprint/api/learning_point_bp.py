from flask_restful import Resource
from models.models import LearningPoint
from .resource_factory import view_one, view_all, insert_one, update_one, delete_one

model = LearningPoint
json_object_name = "learning_point"


class LearningPointResource(Resource):
    def get(self, id=None):
        if id is not None:
            return view_one(model, id)
        else:
            return view_all(model)

    def post(self):
        return insert_one(model, json_object_name)

    def put(self, id):
        return update_one(model, id, json_object_name)

    def delete(self, id):
        return delete_one(model, json_object_name)
