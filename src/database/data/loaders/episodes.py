import json
from src.utils.marshmallow.episode_schema import EpisodeSchema
from src.database.utils.crud import create_row
from flask import g
import os
def load_episodes(app,file):
    with open(os.path.join(app.static_folder,"data","episodes.json"), 'r') as f:
        data = json.load(f)
    converter = EpisodeSchema()
    converter.session = g.db
    for episode in data:
        row = converter.load(episode).data
        create_row(row)



    
