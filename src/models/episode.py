from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag
from .learning_point import LearningPoint
class Episode(Base.Model):
    """
    The episode class represents a row of the episodes table in the database. The purpose of this model is to record information on an episode.
    An episode is defined as a particular resource published by the DigitalAcademy. This includes for example a busrides episode.

    Attributes
    ----------
    id  
        primary key
    title 
        the title of the episode
    tagline
        a one sentence description of the episode
    """
    __tablename__ = "episodes"
    id = Column(BigInteger,
        Sequence("episode_id_seq"),
        primary_key=True
    )
    #removed server_default=text("nextval('episode_id_seq'::regclass)") \
    # this is verbose code
    title = Column(Text)
    tagline = Column(Text)
    description = Column(Text)
    body = Column(Text)
    #this is non timezone specific consider using TIMESTAMPZ 
    addedOn = Column("added_on",DateTime, server_default=text("now()"))
    language = Column(Text)
    slug = Column(Text)
    #association_proxy is an sqlalchemy proxy 
    #it forwards a desired attribute from objects in a relationship
    #doc-url: https://docs.sqlalchemy.org/en/latest/orm/extensions/associationproxy.html
    #associationproxy also masks the association table by managing the updating of the different relationships
    #thus when I add a tag to the tags relationship the episodeTags relationship updates
    tags = association_proxy("episodeTags", "tag")
    blog = relationship("Blog", backref=backref("episode", uselist = False), uselist= False)
    podcast = relationship("Podcast", backref=backref("episode", uselist = False), uselist = False)
    video = relationship("Video", backref=backref("episode", uselist = False), uselist = False)
    learningPoints = association_proxy('episodesLearningPoints', 'learningPoint')
    def __init__(self, keywords = None, tags = None, learningPoints = None, *args, **kwargs):
        super(Episode, self).__init__(*args,**kwargs)
        tags = tags or []
        for tag in tags:
            self.tags.append(tag)
        learningPoints = learningPoints or []
        for learningPoint in learningPoints:
            self.learningPoints.append(learningPoint) 
 
class EpisodeTag(Base.Model):
    __tablename__ = "episode_tags"
    #reason as to why the foreign keya have the primary_key=True
    #here: https://stackoverflow.com/questions/47995784/why-are-the-foreign-keys-in-a-sqlalchemy-association-object-marked-as-primary-ke
    #TLDR
    #1 to ensure that the relationship is unique
    #2 to speed up joins by creating an index
    episodeId = Column("episode_id",BigInteger,
       ForeignKey('episodes.id'),
       primary_key = True
       )
    tagId = Column("tag_id",BigInteger,
       ForeignKey('tags.id'),
       primary_key = True 
       )
    addedOn = Column("added_on",DateTime, 
       server_default = text("now()")
       )
    episode = relationship(
        "Episode",
        #cascade parameter is important here
        #it specifies that an EpisodeTag object exists
        #so long as the parent does
        #doc-url: https://docs.sqlalchemy.org/en/latest/orm/cascades.html
        backref= backref("episodeTags", 
            cascade= "all, delete-orphan"),
        single_parent= True
    )
    tag = relationship(
        "Tag",
        backref = backref("episodeTags", 
            cascade= "all, delete-orphan"),
        single_parent= True
    )
    def __init__(self, tag = None, episode = None, *args, **kwargs):
        super(EpisodeTag, self).__init(*args, **kwargs)
        if isinstance(tag, Tag):
            self.tag = Tag
            self.episode = episode
        elif isinstance(tag, Episode):
            self.tag = episode
            self.episode = tag
    
class EpisodeLearningPoint(Base.Model):
    __tablename__ = 'episode_learning_point'

    episodeId = Column("episode_id",BigInteger,
       ForeignKey('episodes.id'),
       primary_key = True
       )
    learningPointId = Column('learning_point_id', BigInteger, 
    ForeignKey('learning_points.id'), 
    primary_key = True )
    episode = relationship('Episode', 
        backref= backref('episodeLearningPoints', 
            cascade = "all, delete-orphan"),
        single_parent= True)
    learningPoint = relationship('LearningPoint', 
        backref = backref('episodeLearningPoints', 
            cascade = "all, delete-orphan"),
        single_parent= True)
    def __init__(self, learningPoint = None, episode = None, *args, **kwargs):
        super(EpisodeLearningPoint, self).__init(*args, **kwargs)
        if isinstance(learningPoint, LearningPoint):
            self.learningPoint = learningPoint
            self.episode = episode
        #This is a hack because SQLAlchemy didn't realise you would want two bidirectional relationships with association tables
        elif isinstance(learningPoint, Episode):
            self.episode = learningPoint
            self.learningPoint = episode
        
