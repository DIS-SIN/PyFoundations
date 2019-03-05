from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship
from .basemodel import Base


class UserProfile(Base.Model):
    __tablename__ = "user_profiles"

    id = Column(
        BigInteger,
        Sequence("user_profile_id_seq"),
        primary_key=True,
        server_default=text("nextval('user_profile_id_seq'::regclass)"),
    )
    profile_data = Column(Text)

    def __json_fields__(self):
        return ["id", "profile_data"]

