from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, Boolean
from .basemodel import Base


class LearningResource(Base.Model):
    __tablename__ = "learning_resources"

    id = Column(
        BigInteger,
        Sequence("learning_resource_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_resource_id_seq'::regclass)"),
    )
    # author = Column(Text)
    copyright = Column(Boolean)
    licence = Column(Text)
    title = Column(Text)
    description = Column(Text)
    path = Column(Text, unique=True)
    added_on = Column(DateTime)

    def __json_fields__(self):
        return [
            "id",
            "copyright",
            "licence",
            "title",
            "description",
            "path",
            "added_on",
        ]

    def __json_relationships__(self):
        return []  # "author"
