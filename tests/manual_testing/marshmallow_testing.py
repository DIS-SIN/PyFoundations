import sys
import os
sys.path.append(os.path.realpath('../../'))
import src
from src.database.utils.crud import read_row_by_id, create_row
from src.models.learning_stream import LearningStream
from src.models.learning_point import LearningPoint
from src.models.learning_practice import LearningPractice
from src.models.blog import Blog
from src.utils.marshmallow.learning_stream_schema import LearningStreamSchema
from src.utils.marshmallow.learning_practice_schema import LearningPracticeSchema
from src.utils.marshmallow.learning_point_schema import LearningPointSchema
from flask import g
import pprint
import json
app = src.create_app(mode = 'development', initdb = False, 
    static_path= os.path.realpath('../../static'), 
    template_path= os.path.realpath('../../templates'),
    instance_path= os.path.realpath('../../instance'))
with app.app_context():
    test = read_row_by_id(LearningStream, 1).one()
    stream_mencoder = LearningStreamSchema()
    with open('learning_stream_output.json', 'w+') as f:
        json.dump(stream_mencoder.dump(test), f)
    test = read_row_by_id(LearningPractice, 5).one()
    practice_mencoder = LearningPracticeSchema()
    with open('learning_practice_output.json', 'w+') as f:
        json.dump(practice_mencoder.dump(test), f)
    test = read_row_by_id(LearningPoint, 1).one()
    point_mencoder = LearningPointSchema()
    with open('learning_point_output.json', 'w+') as f:
        json.dump(point_mencoder.dump(test), f)
    stream = {
        'name': 'Test',
        'slug': 'test',
        'tags':[
           {
               'tagtext': 'hello'
           }
        ]
    }
    test_load_stream = stream_mencoder.load(stream, session= g.db).data
    print(test_load_stream.tags[0].tagtext)
    test = Blog(body = """The world has undergone disruptive change in the last decades, driven by exponential advances in digital technologies. Our cars not only listen, but respond. Our banks approve online mortgage applications in minutes. Our favourite pizza joints let us track our pies from oven to door in real time. The ripple effects of this digital revolution are both incredible and indiscriminate, and no nook or cranny of our society has been left untouched—including government.
In fact, this brave new world poses some very real challenges to governments the world over, and while the right response isn’t necessarily to start “moving fast and breaking things,” we just as certainly can’t stand still. The digital future is here, and we must move from reluctantly reacting to proactively engaging if we are to meet the expectations of those we serve.
What exactly does this mean?First, the digital revolution is inextricable from the technology that drives it. As such, it will evidently mean changes in government tools and systems. This transformation will help establish the IT backbone needed to deliver the services Canadians expect: simple, modern and digitally enabled, available anytime, anywhere, from any device.
Yet digital government is far more than modern websites and optical fibres, sophisticated algorithms and flashy apps. In fact, many leaders in the digital government space argue that it’s not even primarily about the tech.
Rather, the more transformative change is the digital revolution’s rewrite of how we “do government,” soup to nuts. Because doing digital right means putting the needs of those we serve at the centre of all we do, rather than continuing to privilege organizational silos or institutional convenience. It means conceding that we rarely know what the future holds, but instead need the permission and the space to fail fast, change course and improve over time. It means designing our services for the hardest-to-reach users first, not last. It means recognizing the data we collect for the asset it is and stewarding it accordingly. And it means humbly admitting that we don’t have all the answers, nor are we alone in the service delivery space. Instead, we must work in the open as digital allies, forging partnerships across branches, departments, jurisdictions and sectors, and learning from one another’s successes and failures.
""")
    print(test.keywords[1].keyword)
    print(test.estimatedReadingTimeString)
    create_row(test)



    

