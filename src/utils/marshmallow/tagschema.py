from .baseschema import ma
from src.models.tag import Tag
from marshmallow import fields, post_dump, post_load
from src.database.utils.crud import read_rows
class TagSchema(ma.ModelSchema):
    episodeTags = fields.Nested('EpisodeTagsSchema', many = True, exclude=('tag', 'tagId'), dump_only = True)
    episodes = fields.Nested('EpisodeSchema', many = True, exclude = ('episodeTags', 'tags'))
    class Meta:
        model = Tag
    @post_dump
    def clean_up(self, data):
        if data.get('episodeTags') is not None:
            data['episodes'] = data['episodeTags']
            del data['episodeTags']
        return data
    @post_load
    def load_tag(self, data):
        tagtext = data.get('tagtext')
        if tagtext is None:
            raise ValueError('tagtext must be provided')
        results = read_rows(Tag,{
            'tagtext': {
                'comparitor': '==',
                'data': tagtext
            }
        }).one_or_none()
        if results is not None:
            return results
        else:
            newTag = Tag()
            newTag.tagtext = tagtext
            return newTag
        



