
from src.models.learning_stream import LearningStream
from src.models.learning_practice import LearningPractice
from src.models.learning_point import LearningPoint
from src.database.utils.crud import create_row, read_rows
from nltk.tokenize import TweetTokenizer
import re
import json
import string
from flask import g
def load_learning_architecture(app, file_path):
    with open(file_path, 'r', encoding = 'utf-8') as f:
        learning_architecture = json.load(f)
        learning_architecture = learning_architecture["loach_structure"]
    streams = learning_architecture['streams']
    punct = set(string.punctuation)
    learning_practices_cache = {}
    learning_points_cache = {}
    tokenizer = TweetTokenizer()
    for stream in streams:
        new_stream = LearningStream()
        new_stream.name = stream['stream']
        new_stream.description = stream['description']
        new_stream.image = stream['cover']
        stream_slug_array = tokenizer.tokenize(new_stream.name.lower())
        if len(stream_slug_array) == 1:
            new_stream.slug = stream_slug_array[0]
        else:
            stream_slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and  not x in punct, stream_slug_array))
            new_stream.slug = '_'.join(stream_slug_array)
        stream_practices = stream.get('practices') or [] 
        for practice in stream_practices:
            query = learning_practices_cache.get(practice.lower())
            if query is None:
                new_learning_practice = LearningPractice()
                new_learning_practice.name = practice
                practice_data = __find_learning_practice(learning_architecture, practice)
                practice_slug_array = tokenizer.tokenize(practice.lower())
                if len(practice_slug_array) == 1:
                    new_learning_practice.slug = practice_slug_array[0].lower()
                else:
                    practice_slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and  not x in punct, practice_slug_array))
                    new_learning_practice.slug = '_'.join(practice_slug_array)
                if practice_data is not  None:
                    practice_skills = practice_data.get('skills')
                    if practice_skills is not None:
                        for skill in practice_skills:
                            learning_points = skill.get('learningpoints')
                            if learning_points is not None:
                                for learning_point in learning_points:
                                    learning_point_name = learning_point.get('lp')
                                    if learning_point_name is not None:
                                        query = learning_points_cache.get(learning_point_name.lower())
                                        if query is None:
                                            new_learning_point = LearningPoint()
                                            new_learning_point.name = learning_point_name
                                            learning_point_slug_array = tokenizer.tokenize(learning_point_name.lower())
                                            if len(learning_point_slug_array) == 1:
                                                new_learning_point.slug = learning_point_slug_array[0]
                                            else:
                                                learning_point_slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and  not x in punct, learning_point_slug_array))
                                                new_learning_point.slug = '_'.join(learning_point_slug_array)
                                            create_row(new_learning_point)
                                            learning_points_cache[learning_point_name.lower()] = {'object': new_learning_point, 'learningPractices':[new_learning_practice.slug]}
                                            new_learning_practice.learningPoints.append(new_learning_point)
                                        else:
                                            if not new_learning_practice.slug in query['learningPractices']:
                                                new_learning_practice.learningPoints.append(query['object'])
                                                query['learningPractices'].append(new_learning_practice.slug)
                create_row(new_learning_practice)
                learning_practices_cache[practice.lower()] = {'object': new_learning_practice, 'learningStreams':[new_stream.slug]}
                new_stream.learningPractices.append(new_learning_practice)
            else:
                if not new_stream.slug in query['learningStreams']:
                    new_stream.learningPractices.append(query['object'])
                    query['learningStreams'].append(new_stream.slug)
        create_row(new_stream)

def __find_learning_practice(data, learning_practice):
    practices = data['architecture']
    for practice in practices:
        if practice['practice'].lower() == learning_practice.lower():
            return practice

    

    
    
