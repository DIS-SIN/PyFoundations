from flask_restful import Resource
from models.models import Stream

model = Stream


class StreamResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_one

        return view_one(model, id)


class AllStreamResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_all

        return view_all(model)
