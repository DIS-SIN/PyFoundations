from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from src.database.utils.crud import read_rows
class Tag(Base.Model):
    __tablename__ = "tags"
    id = Column(
        BigInteger,
        Sequence("tag_id_seq"),
        primary_key=True,
        server_default=text("nextval('tag_id_seq'::regclass)"),
    )
    tagtext = Column(Text)
    added_on = Column(DateTime, server_default=text("now()"))
    episodes = association_proxy("episodeTags", "episode")
    learningStreams = association_proxy("learningStreamTags", "learningStream")
    learningPractices = association_proxy("leaningPracticeTags", "learningPractice")
    learningPoints = association_proxy("learningPointTags", "learningPoint")
        
