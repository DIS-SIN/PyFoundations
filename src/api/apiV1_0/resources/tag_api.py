from flask_restful import Resource
from flask import request
from src.models.tag import Tag
from src.utils.marshmallow.tag_schema import TagSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_all_rows
)
model = Tag
class TagResource(Resource):
    def get(self, id=None, tag = None):
        if id is not None:
            return get_one_row_by_id(model, id, TagSchema)
        elif tag is not None:
            return get_all_rows(model,TagSchema, filters = [
                {
                    'tagtext': {
                        'comparitor': '==',
                        'data': tag
                    }
                }
            ])
        else:
            return get_all_rows(model, TagSchema)