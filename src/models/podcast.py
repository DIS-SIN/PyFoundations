from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import timedelta
timedelta()
class Podcast:
    __tablename__ = "podcasts"
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    link = Column(Text)
    #timedelta will be used to construct the string
    durationString = Column(Text)
    durationInMilliseconds = Column(BigInteger)
    #link to artwork
    artwork = Column(Text)
    episode = relationship("Episode", back_populates= "podcast", uselist= True)