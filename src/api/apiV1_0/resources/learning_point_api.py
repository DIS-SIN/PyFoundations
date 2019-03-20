from flask_restful import Resource
from flask import request
from src.models.learning_point import LearningPoint
from ..utils.crud_wrapper import ( 
    get_one_row_by_id, 
    get_one_row_by_slug,
    get_all_rows)
from src.utils.marshmallow.learning_point_schema import LearningPointSchema 
model = LearningPoint
class LearningPointResource(Resource):
    def get(self, id=None, slug=None ):
        if id is not None:
            return get_one_row_by_id(model, id, LearningPointSchema)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, LearningPointSchema)
        else:
            return get_all_rows(model, LearningPointSchema)
