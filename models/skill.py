from sqlalchemy import Column, Sequence, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import BIGINT
from sqlalchemy.orm import relationship
from . import basemodel

# Skill is an element of the learning architecture


class Skill(basemodel.Base):
    __tablename__ = 'skills'
    id = Column('ID', BIGINT, Sequence('skills_seq_id'), primary_key=True)
    name = Column('Name', String)
    description = Column('Description', String)
    # TODO Review Relationship
    learning_points = relationship('LearningPoint')
    learning_points_id = Column(
        "LearningPointId", ForeignKey("learning_points.id"))
    # TODO Review relationship
    knowledge_points = relationship('KnowledgePoint')
    knowledge_points_id = Column(
        "KnowledgePointId", ForeignKey("knowledge_points.id"))
    slug = Column("Slug", String)
    # TODO Review relationship
    tags = Column('Tag', relationship('Tag'))
    tags_id = Column(Integer, ForeignKey("tag.id"))

# 	ID              int64 `schema: "-"`
# 	Name            string
# 	Description     string
# 	LearningPoints[]*LearningPoint
# 	KnowledgePoints[]*KnowledgePoint
# 	Slug            string `schema: "-"`
# 	Tags[]*string
