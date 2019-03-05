from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag
from .learning_point import LearningPoint
from .learning_resource import LearningResource
from .experience import Experience


class Episode(Base.Model):
    __tablename__ = "episodes"

    id = Column(
        BigInteger,
        Sequence("episode_id_seq"),
        primary_key=True,
        server_default=text("nextval('episode_id_seq'::regclass)"),
    )
    title = Column(Text)
    tagline = Column(Text)
    sub_title = Column(Text)
    body = Column(Text)
    likes = Column(BigInteger)
    published_on = Column(DateTime, server_default=text("now()"))
    slug = Column(Text)
    # author = Column(JSON)
    # image = Column(JSON)
    # videos = Column(JSON)
    # podcasts = Column(JSON)
    # edits = Column(JSON)
    tags = relationship(
        "Tag",
        secondary="m_Episodes_Tags",
        backref=backref("m_Episodes_Tags.source_id"),
        lazy="subquery",
    )
    learning_points = relationship(
        "LearningPoint",
        secondary="m_LearningPoints_Episodes",
        backref=backref("m_LearningPoints_Episodes.destination_id"),
        lazy="subquery",
    )
    learning_resources = relationship(
        "LearningResource",
        secondary="m_LearningResources_Episodes",
        backref=backref("m_LearningResources_Episodes.destination_id"),
        lazy="subquery",
    )
    experience = relationship(
        "Experience",
        secondary="m_Episodes_Experiences",
        backref=backref("m_Episodes_Experiences.source_id"),
        lazy="subquery",
    )
    # digital_standards = Column(JSON)
    # banner_image = Column(JSON)

    def __json_fields__(self):
        return [
            "id",
            "title",
            "tagline",
            "sub_title",
            "body",
            "likes",
            "published_on",
            "slug",
        ]

    def __json_relationships__(self):
        return [
            ["learning_points", LearningPoint],
            ["tags", Tag],
            # "author",
            # "image",
            # "videos",
            # "podcasts",
            # "edits",
            ["learning_resources", LearningResource],
            ["experience", Experience],
            # "digital_standards",
            # "banner_image",
        ]
