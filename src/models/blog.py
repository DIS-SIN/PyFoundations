from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from nltk import TweetTokenizer, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from datetime import timedelta
#used for the actual feature extraction
from sklearn.feature_extraction.text import CountVectorizer
#used for language detection (built on Google)
from textblob import TextBlob
#contains language models and will be used for lemmatization in both english and french
import spacy
#used to get a list of punctuations 
import string
#regular expression library
import re
class Blog(Base.Model):
    __tablename__ = "blogs"
    # according to documentation the SERIAL sudo datatype should be automatically used for integer type primary keys
    # if this is the case I will not explicilty specify the sequence moving forward 
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    body = Column(Text)
    language = Column(Text)
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
    def __init__(self,language = None, keywords = None, *args,**kwargs):
        super(Blog , self).__init__(*args,**kwargs)
        keywords = keywords or []
        english_syns = ['eng', 'en', 'english']
        french_syns = ['fr', 'frn','french']
        english_stopwords = set(stopwords.words('english'))
        french_stopwords = set(stopwords.words('french'))
        if not bool(keywords):
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
            if self.language is None:
                language = TextBlob(self.body).detect_language()
                if language != 'en' and language != 'fr':
                    self.language = 'en'
                else:
                    ValueError('language not recognized or supported')
            else:
                self.language = self.language.lower()
            if self.language in english_syns:
                self.language = 'en'
                nlp = spacy.load('en')
            elif self.language in french_syns:
                self.language = 'fr'
                nlp = spacy.load('fr')
            else:
                raise ValueError('language not recognized or supported')
            for sentence in data:
                full_sentence = ' '.join(sentence)
                doc = nlp(u""+full_sentence)
                sentence = []
                for token in doc:
                    if not (token.is_stop or token in english_stopwords):
                        sentence.append(token)
                sentence = ' '.join(sentence)
            
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
 


