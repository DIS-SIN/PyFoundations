from .baseschema import ma
from src.models.video import Video
from marshmallow import fields

class VideoSchema(ma.ModelSchema):
    episode = fields.Nested('EpisodeSchema', many = True, exclude = ('video',))
    class Meta:
        model = Video 
