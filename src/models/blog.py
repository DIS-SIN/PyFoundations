from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship

class Blog(Base.Model):
    __tablename__ = "blogs"
    # according to documentation the SERIAL sudo datatype should be automatically used for integer type primary keys
    # if this is the case I will not explicilty specify the sequence moving forward 
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    body = Column(Text)
    numberOfWords = Column("number_of_words",BigInteger)
    numberOfSentences = Column("number_of_sentences",BigInteger)
    numberOfCharacters = Column("number_of_characters",BigInteger)
    estimatedReadingTimeMilliseconds = Column("estimated_reading_time_millisconds",BigInteger)
    estimatedReadingTimeString = Column("estimated_reading_time_string",Text)
    addedOn = Column("added_on",DateTime, 
       server_default = text("now()")
       )
    episodeId = Column(BigInteger, ForeignKey("episodes.id"))
    #uselist=False is to prevent a scalar from being used and instead pointing to the object directly
    episode = relationship("Episode", back_populates = "blog" , uselist = False)
 


