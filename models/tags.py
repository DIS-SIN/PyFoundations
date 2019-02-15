from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, Text, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from .basemodel import Base

# Status: Prototype Done, Mapping from real db TODO


class Tag(Base):
    __tablename__ = "tags"

    id = Column(
        BigInteger,
        primary_key=True,
        server_default=text("nextval('tag_id_seq'::regclass)"),
    )
    tag = Column(Text)
    added_timestamp = Column(DateTime, server_default=text("now()"))

    # Function for specifying which fields should be
    # read when serialising into JSON
    def __json__(self):
        return ["tag", "added_timestamp"]

    def __to_json__(self):
        return {"tag": self.tag, "added_timestamp": self.added_timestamp}

