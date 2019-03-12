from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag
class Experience(Base.Model):
    __tablename__ = "experiences"
    id = Column(
        BigInteger,
        Sequence("experience_id_seq"),
        primary_key=True,
    )
    occurredAt = Column(DateTime)
    validated = Column(Boolean)
    #why is time a BigInteger is this the number of hours minutes spent ect ?
    #need further clarifications
    time = Column(BigInteger)
    value = Column(BigInteger)
    difficulty = Column(BigInteger)
    points = Column(BigInteger)
    depth = Column(BigInteger)
    def __json_fields__(self):
        return [
            "id",
            "user_name",
            "verb",
            "occurred_at",
            "validated",
            "time",
            "value",
            "difficulty",
            "points",
            "depth",
        ]

    def __json_relationships__(self):
        return [
            ["tags", Tag] 
            ]

