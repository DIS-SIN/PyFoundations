from .basemodel import Base
from sqlalchemy import BigInteger, Text, ForeignKey, Column
from sqlalchemy.orm import relationship
class Blog(Base.Model):
    __tablename__ = "blogs"
    # according to documentation the SERIAL sudo datatype should be automatically used for integer type primary keys
    # if this is the case I will not explicilty specify the sequence moving forward 
    id = Column(BigInteger, primary_key = True)
    text = Column(Text)
    numberOfWords = Column(BigInteger),
    numberOfSentences = Column(BigInteger),
    numberOfCharacters = Column(BigInteger)
    episodeId = Column(BigInteger, ForeignKey("episodes.id"))
    #uselist=False is to prevent a scalar from being used and instead pointing to the object directly
    episode = relationship("Episode", back_populates = "blog" , uselist = False)


