from flask_restful import Resource
from models.models import LearningResource

model = LearningResource


class LearningResourceResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_one

        return view_one(model, id)


class AllLearningResourceResource(Resource):
    def get(self):
        from .blueprint_factory import view_all

        return view_all(model)
