from .baseschema import ma
from src.models.blog import Blog
from marshmallow import fields
class BlogSchema(ma.ModelSchema):
    #overriding the episode field to include the nested schema rather than the primary keys
    episode = fields.Nested('EpisodeSchema', many = True, exclude=("blog",))
    class Meta:
        model = Blog