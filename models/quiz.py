import datetime
from sqlalchemy import Column, Sequence, Boolean, Integer, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, BIGINT
from sqlalchemy.orm import relationship
import basemodel

# Quiz represents a test of a user's knowledge


class Quiz(basemodel.Base):
    __tablename__ = 'quizzes'
    id = Column('ID', BIGINT, Sequence('quizzes_seq_id'), primary_key=True)
    title = Column('Title', String)
    # TODO review relationship
    question = Column('Question', relationship('Question'))
    question_id = Column(Integer, ForeignKey('question.id'))
    tagline = Column('Tagline', String)
    body = Column('Body', String)
    subtitle = Column('SubTitle', String)
    # TODO Review relationship
    image = Column('Image', relationship('Image'))
    image_id = Column(Integer, ForeignKey('image.id'))
    # TODO Review relationship
    video = Column('Video', relationship('Video'))
    video_id = Column(Integer, ForeignKey('video.id'))
    likes = Column('Likes', Integer)
    published_on = Column('PublishedOn', DateTime)

    # TODO check array
    edited_on = Column('EditedOn', ARRAY('''''''Edit''''''', dimensions=1))

    # TODO Review relationship
    tags = Column('Tag', relationship('Tag'))
    tags_id = Column(Integer, ForeignKey('tag.id'))

    # TODO Review Relationship
    learning_points = relationship('LearningPoint')
    learning_points_id = Column(
        'LearningPointId', ForeignKey('learning_points.id'))
    # TODO Review array
    digital_standards = Column('DigitalStandards', ARRAY(String, dimensions=1))

    # TODO Review relationship
    banner_image = Column('BannerImage', relationship('Image'))
    banner_image_id = Column(Integer, ForeignKey('banner_image.id'))
    slug = Column('Slug', String)
    #    ID               int64
    #    Title            string
    #    Questions[]*Question
    #    Tagline          string
    #    Body             string
    #    SubTitle         string
    #    Author * User
    #    Images[]*Image
    #    Videos[]*Video
    #    Likes            int        `schema: "-"`
    #    PublishedOn * time.Time `schema: "-"`
    #    EditedOn[]*Edit    `schema: "-"`
    #    Tags[]*string
    #    LearningPoints[]*LearningPoint
    #    DigitalStandards[]string
    #    BannerImage * Image `schema: "-"`
    #    slug             string `schema: "-"`

# Question is an question in a quiz


class Question:
    id = Column('ID', Sequence('questions_seq_id'), primary_key=True)
    question = Column('Question', String)
    # TODO check array
    answers = Column('Answers', ARRAY(String, dimensions=1))
    correct_answer = Column('CorrectAnswer', Integer)
    #    Question      string
    #    Answers[]string
    #    CorrectAnswer int
