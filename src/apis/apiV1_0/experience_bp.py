from flask_restful import Resource
from flask import request
from src.models.models import Experience
from .utils.crud_wrapper import (
    get_one_row,
    get_all_rows,
    create_one_row,
    update_one_row,
    delete_one_row
)
from .utils.api_helpers import construct_row_object
import json
model = Experience
class ExperienceResource(Resource):
    def get(self, id=None):
        if id is not None:
            return get_one_row(model, id)
        else:
            return get_all_rows(model)
    def post(self):
        req_vals = request.get_json()
        try:
            row = construct_row_object(model, req_vals)
            return create_one_row(row)
        except AttributeError as e:
            return {'error': repr(e)}, 400
    def put(self, id):
        req_vals = request.get_json()
        return update_one_row(model, id, req_vals)
    def delete(self, id):
        return delete_one_row(model, id)
