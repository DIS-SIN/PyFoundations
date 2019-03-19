from flask_restful import Resource
from flask import request
from src.models.podcast import Podcast
from src.utils.marshmallow.podcast_schema import PodcastSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows
)
model = Podcast
class PodcastResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, PodcastSchema)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, PodcastSchema)
        else:
            return get_all_rows(model, PodcastSchema)