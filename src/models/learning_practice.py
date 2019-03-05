from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag


class LearningPractice(Base.Model):
    __tablename__ = "learning_practices"

    id = Column(
        BigInteger,
        Sequence("learning_practice_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_practice_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    tags = relationship(
        "Tag",
        secondary="m_LearningPractices_Tags",
        backref=backref("m_LearningPractices_Tags.source_id"),
        lazy="subquery",
    )

    def __json_fields__(self):
        return ["id", "name", "description", "slug"]

    def __json_relationships__(self):
        return [["tags", Tag]]
