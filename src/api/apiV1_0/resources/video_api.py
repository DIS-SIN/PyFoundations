from flask_restful import Resource
from flask import request
from src.models.video import Video
from src.utils.marshmallow.video_schema import VideoSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows
)
model = Video
class VideoResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, VideoSchema)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, VideoSchema)
        else:
            return get_all_rows(model, VideoSchema)