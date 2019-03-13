from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from .basemodel import Base

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
    

