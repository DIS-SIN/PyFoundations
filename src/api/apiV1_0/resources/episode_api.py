from flask_restful import Resource
from flask import request
from src.models.episode import Episode
from src.utils.marshmallow.episode_schema import EpisodeSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows
)
model = Episode
class EpisodeResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, EpisodeSchema)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, EpisodeSchema)
        else:
            return get_all_rows(model, EpisodeSchema)