from .baseschema import ma
from src.models.podcast import Podcast
from marshmallow import fields

class PodcastSchema(ma.ModelSchema):
    episode = fields.Nested('EpisodeSchema', many = True, exclude =("podcast",))
    class Meta:
        model = Podcast