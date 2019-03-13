from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text,ForeignKey, DateTime, text
from sqlalchemy.orm import relationship
from .episode import Episode
class Video(Base.Model):
    __tablename__="videos"
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    durationString = Column("duration_string",Text)
    durationMilliseconds = Column("duration_milliseconds",BigInteger)
    thumbnail = Column(Text)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    episodeId = Column("episode_id",BigInteger, ForeignKey("episodes.id"))
    episode = relationship("Episode", back_populates="video", uselist = False)
    def __json_fields(self):
        return [
            "id",
            "title",
            "durationString",
            "durationMilliseconds",
            "thumbnail",
            "addedOn",
            "episodeId"
        ]
    def __json_relationships(self):
        return [
            ["episode", Episode]
        ]

