from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .learning_stream import LearningStream


class User(Base.Model):
    __tablename__ = "users"

    id = Column(
        BigInteger,
        Sequence("user_id_seq"),
        primary_key=True,
        server_default=text("nextval('user_id_seq'::regclass)"),
    )
    user_name = Column(Text, unique=True)
    email = Column(Text)
    password = Column(Text)
    is_admin = Column(Boolean)
    created_at = Column(DateTime, server_default=text("now()"))
    updated_at = Column(DateTime)
    onboarded = Column(Boolean)
    role = Column(Text)
    language = Column(Text)
    # learner_profile = Column(JSON)
    learning_stream = relationship(
        "LearningStream",
        secondary="m_Users_LearningStreams",
        backref=backref("m_Users_LearningStreams.source_id"),
        lazy="subquery",
    )
    user_profile = relationship(
        "UserProfile",
        secondary="m_Users_UserProfiles",
        backref=backref("m_Users_UserProfiles.source_id"),
        lazy="subquery",
    )

    def __json_fields__(self):
        return [
            "id",
            "user_name",
            "email",
            "password",
            "is_admin",
            "created_at",
            "updated_at",
            "onboarded",
            "role",
            "language",
        ]

    def __json_relationships__(self):
        return [
            ["learning_streams", LearningStream]
        ]  # ["learner_profile", LearnerProfile],

