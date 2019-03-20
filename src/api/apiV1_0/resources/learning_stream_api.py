from flask_restful import Resource
from flask import request
from src.models.learning_stream import LearningStream
from src.utils.marshmallow.learning_stream_schema import LearningStreamSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows,
)
model = LearningStream
class LearningStreamResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, LearningStreamSchema)
        elif slug is not None:
            return get_one_row_by_slug(model,slug, LearningStreamSchema)
        else:
            return get_all_rows(model, LearningStreamSchema)
