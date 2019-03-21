from flask_restful import Resource
from flask import request
from src.models.keyword import Keyword
from src.utils.marshmallow.keyword_schema import KeywordSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_all_rows
)
model = Keyword
class KeywordResource(Resource):
    def get(self, id=None, keyword = None):
        if id is not None:
            return get_one_row_by_id(model, id, KeywordSchema)
        elif keyword is not None:
            return get_all_rows(model,KeywordSchema, filters = [
                {
                    'keyword': {
                        'comparitor': '==',
                        'data': keyword
                    }
                }
            ])
        else:
            return get_all_rows(model, KeywordSchema)