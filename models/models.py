from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Integer,
    JSON,
    String,
    Table,
    Text,
    ForeignKey,
)
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class CharacterModel(db.Model):
    __tablename__ = "character_models"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    author = Column(JSON)
    character = Column(JSON)
    open = Column(Boolean)
    likes = Column(BigInteger)
    image = Column(JSON)
    slug = Column(Text)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))


class CultModel(db.Model):
    __tablename__ = "cult_models"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    author = Column(JSON)
    cult = Column(JSON)
    official = Column(Boolean)
    open = Column(Boolean)
    likes = Column(BigInteger)
    image = Column(JSON)
    slug = Column(Text)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))


class Episode(db.Model):
    __tablename__ = "episodes"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    title = Column(Text)
    tagline = Column(Text)
    sub_title = Column(Text)
    body = Column(Text)
    author = Column(JSON)
    image = Column(JSON)
    videos = Column(JSON)
    podcasts = Column(JSON)
    likes = Column(BigInteger)
    published_on = Column(DateTime(True))
    edits = Column(JSON)
    tags = Column(JSON)
    learning_points = Column(JSON)
    learning_resources = Column(JSON)
    experience = Column(JSON)
    digital_standards = Column(JSON)
    banner_image = Column(JSON)
    slug = Column(Text)


class Experience(db.Model):
    __tablename__ = "experiences"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    user_name = Column(Text)
    verb = Column(Text)
    stream = Column(JSON)
    practices = Column(JSON)
    skills = Column(JSON)
    learning_resource_id = Column(BigInteger, ForeignKey("learning_resources.id"))
    learning_resource = relationship("LearningResource", lazy=False)
    occurred_at = Column(DateTime(True))
    validated = Column(Boolean)
    time = Column(BigInteger)
    value = Column(BigInteger)
    difficulty = Column(BigInteger)
    points = Column(BigInteger)
    depth = Column(BigInteger)
    tags = Column(JSON)
    comments = Column(JSON)


class HomelandModel(db.Model):
    __tablename__ = "homeland_models"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    author = Column(JSON)
    homeland = Column(JSON)
    official = Column(Boolean)
    open = Column(Boolean)
    likes = Column(BigInteger)
    image = Column(JSON)
    slug = Column(Text)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))


class Image(db.Model):
    __tablename__ = "images"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    title = Column(Text)
    description = Column(Text)
    path = Column(Text)
    added_on = Column(DateTime(True))


class KnowledgePoint(db.Model):
    __tablename__ = "knowledge_points"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    tags = Column(JSON)


class LearningPoint(db.Model):
    __tablename__ = "learning_points"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    tags = Column(JSON)
    difficulty = Column(BigInteger)


class LearningResource(db.Model):
    __tablename__ = "learning_resources"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    author = Column(Text)
    copyright = Column(Boolean)
    licence = Column(Text)
    title = Column(Text)
    description = Column(Text)
    path = Column(Text, unique=True)
    added_on = Column(DateTime(True))


class OccupationModel(db.Model):
    __tablename__ = "occupation_models"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    author = Column(JSON)
    occupation = Column(JSON)
    official = Column(Boolean)
    open = Column(Boolean)
    likes = Column(BigInteger)
    image = Column(JSON)
    slug = Column(Text)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))


class Podcast(db.Model):
    __tablename__ = "podcasts"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    title = Column(Text)
    description = Column(Text)
    path = Column(Text)
    learning_points = Column(JSON)
    added_on = Column(DateTime(True))


class Practice(db.Model):
    __tablename__ = "practices"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    name = Column(Text)
    description = Column(Text)
    tags = Column(JSON)
    slug = Column(Text)


class Skill(db.Model):
    __tablename__ = "skills"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    name = Column(Text)
    description = Column(Text)
    learning_points = Column(JSON)
    knowledge_points = Column(JSON)
    slug = Column(Text)
    tags = Column(JSON)


class Stream(db.Model):
    __tablename__ = "streams"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    name = Column(Text)
    tags = Column(JSON)
    slug = Column(Text)
    learning_targets = Column(JSON)
    expertise = Column(Integer)


class User(db.Model):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    user_name = Column(Text, unique=True)
    email = Column(Text)
    password = Column(Text)
    is_admin = Column(Boolean)
    learner_profile = Column(JSON)
    streams = Column(JSON)
    created_at = Column(DateTime(True), server_default=FetchedValue())
    updated_at = Column(DateTime(True))
    onboarded = Column(Boolean)
    role = Column(String(12))
    language = Column(String(12))


class Video(db.Model):
    __tablename__ = "videos"

    id = Column(BigInteger, primary_key=True, server_default=FetchedValue())
    title = Column(Text)
    description = Column(Text)
    path = Column(Text)
    learning_points = Column(JSON)
    added_on = Column(DateTime(True))
