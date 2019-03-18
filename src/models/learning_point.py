from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag

class LearningPoint(Base.Model):
    __tablename__ = "learning_points"
    id = Column(
        BigInteger,
        Sequence("learning_point_id_seq"),
        primary_key=True,
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    image = Column(Text)
    difficulty = Column(BigInteger)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    tags = association_proxy("learningPointTags", "tag")
    episodes = association_proxy("episodeLearningPoints", 'episode')
    learningPractices = association_proxy("learningPracticeLearningPoints", 'learningPractice')
    def __init__(self, tags = None, episodes = None, learningPractices = None, *args, **kwargs):
        super(LearningPoint, self).__init__(*args,**kwargs)
        tags = tags or []
        episodes = episodes or []
        learningPractices = learningPractices or []
        if bool(tags):
            for tag in tags:
                self.tags.append(tag)
        if bool(episodes):
            for episode in episodes:
                self.episodes.append(episode)
        if bool(learningPractices):
            for learningPractice in learningPractices:
                self.learningPractices.append(learningPractice)
class LearningPointTags(Base.Model):
    __tablename__ = "learning_point_tags"
    
    learningPointId = Column("learning_point_id", BigInteger, ForeignKey("learning_points.id"), primary_key = True)
    tagId = Column("tag_id", BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    tag = relationship("Tag", 
        backref = backref("learningPointTags", 
            cascade= "all, delete-orphan"),
        single_parent= True)
    learningPoint = relationship("LearningPoint", 
        backref= backref("learningPointTags", 
            cascade = "all, delete-orphan"),
        single_parent= True)
    def __init__(self, tag = None, learningPoint = None, *args, **kwargs):
        super(LearningPointTags, self).__init__(*args, **kwargs)
        if isinstance(tag, Tag):
            self.tag = tag
            self.learningPoint = learningPoint
        elif isinstance(tag, LearningPoint):
            self.learningPoint = tag
            self.tag = learningPoint

