from flask_restful import Resource
from flask import request
from src.models.blog import Blog
from src.utils.marshmallow.blog_schema import BlogSchema
from ..utils.crud_wrapper import (
    get_one_row_by_id,
    get_one_row_by_slug,
    get_all_rows
)
model = Blog
class BlogResource(Resource):
    def get(self, id=None, slug = None):
        if id is not None:
            return get_one_row_by_id(model, id, BlogSchema)
        elif slug is not None:
            return get_one_row_by_slug(model, slug, BlogSchema)
        else:
            return get_all_rows(model, BlogSchema)