from .baseschema import ma
from src.models.episode import Episode, EpisodeTag, EpisodeLearningPoint
from marshmallow import fields, post_dump, pre_load
from src.database.utils.crud import read_rows
from src.models.tag import Tag
from nltk.tokenize import TweetTokenizer
import re
import string
from src.database.db import get_db_session
#TODO
# finish EpisodeLearningPointSchema
# ensure that refrences to tags do not include fields that point to other models
# urlfor link 
class EpisodeSchema(ma.ModelSchema):
    #exclude the reverse relationships to prevent an infinite loop 
    podcast = fields.Nested('PodcastSchema', exclude=('episode','episodeId'))
    blog = fields.Nested('BlogSchema', exclude=('episode','episodeId'))
    video = fields.Nested('VideoSchema', exclude=('episode','episodeId'))
    #Nesting EpisodeTag association model, this will overide the tags field if it is not excluded
    episodeTags = fields.Nested('EpisodeTagsSchema', many = True, exclude = ('episode','episodeId'), dump_only = True)
    #exlude any other many to many relationships with tags to avoid serializing the entire database
    tags = fields.Nested('TagSchema', 
     many = True, 
     exclude = ('learningPoints', 'learningPointTags', 
      'episodes', 'episodeTags', 
      'learningPracticesTags', 'learningPractices',
      'learningStreamTags', 'learningStreams'))
    #same concept as tags many to many relationship
    episodeLearningPoints = fields.Nested('EpisodeLearningPointsSchema',
       many = True,
       exclude= ('episodes', 'episodeId')
    )
    learningPoints = fields.Nested('LearningPointSchema',
     many = True, 
     exclude = ('learningPointTags', 'tags', 
      'episodes', 'episodeLearningPoints', 
      'learningPracticeLearningPoint', 'learningPractice'))
    class Meta:
        model = Episode
        init_session, _ = get_db_session()
        sqla_session = init_session
    href = ma.Hyperlinks(
        {"self": [
            ma.URLFor("apiV1_0.episodes_id", id="<id>"),
            ma.URLFor("apiV1_0.episodes_slug", slug="<slug>")
        ], "collection": ma.URLFor("apiV1_0.episodes")}
    )
    @pre_load
    def check_data(self, data):
        if data.get('id') is None:
            if data.get('title') is None:
                raise ValueError('Must Include title')
            punct = set(string.punctuation)
            #if both the id and the slug is none then this is a completely new blog
            #generate the slug from the title by tokenizing the lowered title and filtering for only alphanumeric characters
            #then use the join method on the filtered slug tokens to form a slug_like_this from ['slug','like','this']
            slug_array = TweetTokenizer().tokenize(data['title'].lower())
            if len(slug_array) == 1:
                data['slug'] = slug_array[0]
            else:
                slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and not x in punct, slug_array))
                data['slug'] = '_'.join(slug_array)
            query = read_rows(Episode, filters= [
                {
                    'slug': {
                        'comparitor': '==',
                        'data': data['slug']
                    }
                }
            ]).one_or_none()
            count = 1
            #loop over until you find a unique slug by appending an incrementing count to the end of the slug
            while query is not None:
                slug = data['slug'] + '_' + str(count)
                query = read_rows(Episode, filters= [
                    {
                        'slug': {
                            'comparitor': '==',
                            'data': slug
                        }
                    }
                ]).one_or_none()
                data['slug'] = slug
                count += 1
        else:
            for key in list(data.keys()):
                if key != 'id':
                    del data[key]

    @post_dump
    def clean_up(self, data):
        #if episodeTag exists meaning it has not been excluded
        if data.get('episodeTags') is not None:
            data['tags'] = data['episodeTags']
            del data['episodeTags']
        if data.get('episodeLearningPoints') is not None:
            data['learningPoints'] = data['episodeLearningPoints']
            del data['episodeLearningPoints']
        return data
class EpisodeTagsSchema(ma.ModelSchema):
    episode = fields.Nested(EpisodeSchema, 
     exclude=('episodeTags','tags',
      'episodeLearningPoints', 'learningPoints'))
    tag = fields.Nested('TagSchema', 
     exclude = ('learningPoints', 'learningPointTags', 
      'episodes', 'episodeTags', 
      'learningPracticesTags', 'learningPractices',
      'learningStreamTags', 'learningStreams'))
    class Meta:
        model = EpisodeTag

class EpisodeLearningPointsSchema(ma.ModelSchema):
    episodes = fields.Nested('EpisodeSchema',
     many = True, 
     exclude=('learningPoints', 'episodeLearningPoints', 'episodeTags', 'tags'))
    learningPoint = fields.Nested('LearningPointSchema',
     exclude = ('learningPointTags', 'tags', 
      'episodes', 'episodeLearningPoints', 
      'learningPracticeLearningPoint', 'learningPractice'))
    class Meta:
        model = EpisodeLearningPoint