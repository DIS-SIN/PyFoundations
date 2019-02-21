from flask_restful import Resource
from models.models import Episode
from .resource_factory import view_one, view_all, insert_one, update_one, delete_one

model = Episode
json_object_name = "episode"


class EpisodeResource(Resource):
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
        return delete_one(model, id)
