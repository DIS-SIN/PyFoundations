from flask_restful import Resource
from flask import request
from src.models.episode import Episode
from src.utils.marshmallow.episode_schema import EpisodeSchema
from apiV1_0.utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows,
    create_one_row,
    update_one_row_by_id,
    update_one_row_by_slug
    delete_one_row_by_id,
)
model = Episode
class EpisodeResource(Resource):
    def get(self, id=None, slug = None):
        dataConverter = EpisodeSchema()
        if id is not None:
            return get_one_row_by_id(model, id, dataConverter)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, dataConverter)

    def post(self):
        dataConverter = EpisodeSchema()
        req_vals = request.get_json()
        try:
            row = dataConverter.load(req_vals)
            return create_one_row(row)
        except AttributeError as e:
            return {"error": repr(e)}, 400

    def put(self, id = None, slug = None):
        if id is None and slug is None:
            return {'error': "ValueError(slug or id must be provided)"}, 400
        elif id is not None:
            return update_one_row
        req_vals = request.get_json()
        return update_one_row(model, id, req_vals)

    def delete(self, id):
        return delete_one_row(model, id)
