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
    uid = Column(Text)
    display_name = Column(Text, unique=True)
    email = Column(Text)
    email_verified = Column(Boolean)
    phone_number = Column(Text)
    provider = Column(Text)
    government_email = Column(Text)
    government_email_verified = Column(Boolean)
    government_email_verified_on = Column(Boolean)
    is_admin = Column(Boolean)
    created_on = Column(DateTime)
    database_created_on = Column(DateTime, server_default=text("now()"))
    last_signed_in = Column(DateTime)
    updated_on = Column(DateTime)
    onboarded = Column(Boolean)
    role = Column(Text)
    language = Column(Text)