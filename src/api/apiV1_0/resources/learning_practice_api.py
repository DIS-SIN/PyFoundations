from flask_restful import Resource
from flask import request
from src.models.learning_practice import LearningPractice
from src.utils.marshmallow.learning_practice_schema import LearningPracticeSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows
)

model = LearningPractice
class LearningPracticeResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, LearningPracticeSchema)
        elif slug is not None: 
            return get_one_row_by_slug(model, slug, LearningPracticeSchema)
        else:
            return get_all_rows(model, LearningPracticeSchema)