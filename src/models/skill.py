from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag
from .learning_point import LearningPoint
from .knowledge_point import KnowledgePoint


class Skill(Base.Model):
    __tablename__ = "skills"

    id = Column(
        BigInteger,
        Sequence("skill_id_seq"),
        primary_key=True,
        server_default=text("nextval('skill_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    learning_points = relationship(
        "LearningPoint",
        secondary="m_Skills_LearningPoints",
        backref=backref("m_Skills_LearningPoints.source_id"),
        lazy="subquery",
    )
    knowledge_points = relationship(
        "KnowledgePoint",
        secondary="m_Skills_KnowledgePoints",
        backref=backref("m_Skills_KnowledgePoints.source_id"),
        lazy="subquery",
    )
    tags = relationship(
        "Tag",
        secondary="m_Skills_Tags",
        backref=backref("m_Skills_Tags.source_id"),
        lazy="subquery",
    )

    def __json_fields__(self):
        return ["id", "name", "description", "slug"]

    def __json_relationships__(self):
        return [
            ["learning_points", LearningPoint],
            ["knowledge_points", KnowledgePoint],
            ["tags", Tag],
        ]

