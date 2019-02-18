from flask_restful import Resource
from models.models import User

model = User


class UserResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_one

        return view_one(model, id)


class AllUserResource(Resource):
    def get(self, id):
        from .blueprint_factory import view_all

        return view_all(model)
