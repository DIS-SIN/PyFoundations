from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base

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
    difficulty = Column(BigInteger)
    addedOn = Column("added_on",DateTime, server_default = text("now"))
    tags = association_proxy("learningPointTags", "tag")
    episodes = association_proxy("episodeLearningPoints", 'episode')
   
class LearningPointTags(Base.Model):
    __tablename__ = "learning_point_tags"
    
    learningPointId = Column("learning_point_id", BigInteger, ForeignKey("learning_points.id"), primary_key = True)
    tagId = Column("tag_id", BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    tag = relationship("Tag", backref = backref("learningPointTags", cascade= "add, delete-orphan"))
    learningPoint = relationship("LearningPoint", backref= backref("learningPointTags", cascade = "add, delete-orphan"))

