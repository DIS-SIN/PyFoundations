from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from nltk import TweetTokenizer, sent_tokenize
from datetime import timedelta
import string
import re
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

    keywords = association_proxy("blogKeywords", "keyword")
    def __init__(self,*args,**kwargs):
       super(Blog,self).__init__(*args,**kwargs)
       word_tokenizer = TweetTokenizer()
       punctuations = string.punctuation
       #prepare a double array where each row is a sentence 
       #each cell is a word 
       #words are only included if they are not punctuation or \
       #special characters
       data = [[word for word in word_tokenizer.tokenize(sentence) \
               if not word in punctuations and re.match("(\\d|\\W)+", word) is None]\
               for sentence in sent_tokenize(self.body)]
       numberOfSentences = len(data)
       numberOfWords = 0
       for sentence in data:
         numberOfWords += len(sentence)
       numberOfCharacters = len(self.body)
       #everage word per minute is 250 thus 250/60 = average word per second = 4.17
       estimatedReadingTimeMilliseconds = numberOfWords/4.17 * 1000
       estimatedReadingTimeString = f"'{(estimatedReadingTimeMilliseconds/1000)//60}'"
       self.estimatedReadingTimeMilliseconds = estimatedReadingTimeMilliseconds
       self.estimatedReadingTimeString = estimatedReadingTimeString
       self.numberOfCharacters = numberOfCharacters
       self.numberOfWords = numberOfWords
       self.numberOfSentences = numberOfSentences
class BlogKeyword(Base.Model):
    __tablename__ = 'blog_keywords'
    blogId = Column("blog_id", 
        BigInteger, 
        ForeignKey("blogs.id"), 
        primary_key = True)
    keywordId = Column("keyword_id", BigInteger, ForeignKey("keywords.id"), primary_key = True)
    blog = relationship("Blog", 
        backref = backref("blogKeywords", 
            cascade = "all, delete-orphan"))
    keyword = relationship("Keyword",
        backref = backref("blogKeywords",
            cascade = "all, delete-orphan"))
    addedOn = Column("added_on", DateTime, server_default = text("now()"))     
 


