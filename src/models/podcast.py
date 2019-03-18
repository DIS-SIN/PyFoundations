from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship
from datetime import timedelta

timedelta()
class Podcast(Base.Model):
    __tablename__ = "podcasts"
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    link = Column(Text)
    #timedelta will be used to construct the string
    durationString = Column("duration_string",Text)
    durationInMilliseconds = Column("duration_in_milliseconds",BigInteger)
    #link to artwork
    artwork = Column(Text)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    episodeId = Column("episode_id",BigInteger, ForeignKey("episodes.id"))
    
