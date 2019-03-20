from .basemodel import Base
from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime, text, Integer
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from nltk import TweetTokenizer, sent_tokenize
from nltk.corpus import stopwords
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
from .keyword import Keyword
class Blog(Base.Model):
    __tablename__ = "blogs"
    # according to documentation the SERIAL sudo datatype should be automatically used for integer type primary keys
    # if this is the case I will not explicilty specify the sequence moving forward 
    id = Column(BigInteger, primary_key = True)
    title = Column(Text)
    slug = Column(Text)
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
    keywords = association_proxy("blogKeywords", "keyword")
    def __init__(self,keywords = None, *args,**kwargs):
        super(Blog , self).__init__(*args,**kwargs)
        keywords = keywords or []
        english_syns = ['eng', 'en', 'english']
        french_syns = ['fr', 'frn','french']
        #check if this blog has keywords if not calculate them
        if not bool(keywords):
            print(keywords)
            from src.database.utils.crud import read_rows
            from .keyword import Keyword
            word_tokenizer = TweetTokenizer()
            punctuations = string.punctuation
            #prepare a double array where each row is a sentence 
            #each cell is a word 
            #words are only included if they are not punctuation or \
            #special characters
            #generate_slug
            data = [[word.lower() for word in word_tokenizer.tokenize(sentence) \
                    if not word in punctuations and re.match("(\\d|\\W)+", word) is None]\
                    for sentence in sent_tokenize(self.body)]
            numberOfSentences = len(data)
            numberOfWords = 0
            for sentence in data:
                numberOfWords += len(sentence)
            numberOfCharacters = len(self.body)
            #everage word per minute is 250 thus 250/60 = average word per second = 4.17
            estimatedReadingTimeMilliseconds = numberOfWords/4.17 * 1000
            estimatedReadingTimeString = f"'{(estimatedReadingTimeMilliseconds/1000)//60}' minute read"
            #check if language was provided,
            #if no language was provided we use TextBlob to detect language which uses the google API
            if self.language is None:
                language = TextBlob(self.body).detect_language()
                #ensure that language is english or french
                if language != 'en' and language != 'fr':
                    ValueError('language not recognized or supported')
                else:
                    self.language = language
            else:
                #users may do things like En or eN so ensure that all characters are lowercase
                self.language = self.language.lower()
            #check if language is in the synynoms 
            if self.language in english_syns:
                self.language = 'en'
                #load the english neural net model 
                #you must download this first
                nlp = spacy.load('en')
                #also get stopwords from nltk corpus
                stop_words = set(stopwords.words('english'))
                additional_stopwords = set(['mean'])
                stop_words = stop_words.union(additional_stopwords)
            elif self.language in french_syns:
                self.language = 'fr'
                #load the french neural net model
                #you must download this first
                nlp = spacy.load('fr')
                #also get stopwords from nltk corpus
                stop_words = set(stopwords.words('french'))
            else:
                #raise error if language is not english or french
                raise ValueError('language not recognized or supported')
            cleaned_data = []
            #print("test")
            for sentence in data:
                #construct corpus from array of words and load this into the spacy neural net
                full_sentence = ' '.join(sentence)
                doc = nlp(u""+full_sentence)
                cleaned_sentence = []
                for token in doc:
                    #go through the tokens and if the token is a stop word as detected by spacy or in the set of stopwords ignore it
                    if not token.is_stop and not str(token) in stop_words:
                        #otherwise append it to the new array
                        cleaned_sentence.append(str(token.lemma_))
                #construct the new normalized corpus for the sentence
                cleaned_sentence = ' '.join(cleaned_sentence)
                cleaned_data.append(cleaned_sentence)
            #create the count vectorizer which will create the frequency matrix or bag of words
            #only 10000 columns allowed for efficiency and we only want unigrams
            count_vectorizer = CountVectorizer(max_features=10000, ngram_range=(1,1))
            count_vectorizer = count_vectorizer.fit(cleaned_data)
            frequency_matrix = count_vectorizer.transform(cleaned_data)
            sum_words = frequency_matrix.sum(axis = 0)
            word_frequencies = [(word, sum_words[0,idx]) for word, idx in count_vectorizer.vocabulary_.items()]
            word_frequencies = sorted(word_frequencies, key = lambda x: x[1], reverse = True)[:5]
            self.blogKeywords = []
            for word in word_frequencies:
                #ensure that the keyword is a unigram
                if len(word[0].split(' ')) == 1:
                    #check if this keyword already exists
                    results = read_rows(Keyword,[
                        {
                            'keyword':{
                                'comparitor': '==',
                                'data': word[0]
                            }
                        }]
                    )
                    #if it is none create a new keyword object and create the association object and add it
                    #otherwise create the association between the existing keyword and add the frequency
                    keyword = results.one_or_none()
                    if keyword is None:
                        new_keyword = Keyword(keyword= word[0])
                        self.blogKeywords.append(BlogKeyword(keyword= new_keyword, frequency= int(word[1])))
                    else:
                        self.blogKeywords.append(BlogKeyword(keyword= keyword, frequency= int(word[1])))
            #set the rest of the calculated variables
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
    keyword = relationship(Keyword,
        backref = backref("blogKeywords",
            cascade = "all, delete-orphan"))
    frequency = Column(Integer)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    def __init__(self, keyword = None, episode = None, frequency = None, *args, **kwargs):
        super(BlogKeyword, self).__init__(*args,**kwargs)
        self.keyword = keyword
        self.episode = episode
        self.frequency = frequency
 


