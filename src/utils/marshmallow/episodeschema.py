from .baseschema import ma
from src.models.episode import Episode, EpisodeTag
from marshmallow import fields, post_dump

class EpisodeSchema(ma.ModelSchema):
    podcast = fields.Nested('PodcastSchema', many = True, exclude=('episode','episodeId'))
    blog = fields.Nested('BlogSchema', many = True, exclude=('episode','episodeId'))
    video = fields.Nested('VideoSchema', many = True, exclude=('episode','episodeId'))
    episodeTags = fields.Nested('EpisodeTagsSchema', many = True, exclude = ('episode','episodeId'), dump_only = True)
    tags = fields.Nested('TagSchema', many = True, exclude = ('episodeTags','episodes'))
    class Meta:
        model = Episode
    @post_dump
    def clean_up(self, data):
        #if episodeTag exists meaning it has not been excluded
        if data.get('episodeTags') is not None:
            data['tags'] = data['episodeTags']
            del data['episodeTags']
        return data

class EpisodeTagsSchema(ma.ModelSchema):
    episode = fields.Nested(EpisodeSchema, exclude=('episodeTags',))
    tag = fields.Nested('TagSchema', exclude=('episodeTags',))
    class Meta:
        model = EpisodeTag