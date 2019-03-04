import os
from flask import current_app, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.models.basemodel import Base
def get_db_session():
    if "db" not in g or "db_engine" not in g:
        g.db_engine = create_engine(current_app.config["SQLALCHEMY_DATABASE_URI"])
        Base.metadata.bind = g.db_engine
        g.db_sessionmaker = sessionmaker(bind=g.db_engine)
        g.db = g.db_sessionmaker()
    return g.db, g.db_engine

def close_db(e=None):
    db_engine = g.pop('db_engine', None)
    g.pop('db_sessionmaker', None)
    db = g.pop('db', None)
    if db is not None:
        db.close()
    if db_engine is not None:
        db_engine.dispose()
def init_db(app):
    from src.models import models, tags
    with app.app_context():
        Base.create_all()
def init_app(app):
    Base.init_app(app)
    app.teardown_appcontext(close_db)

