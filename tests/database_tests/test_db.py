import src
import os
from src.database.utils import crud
from src.models.models import CharacterModel
app = None
def test_create_tables():
    global app
    app = src.create_app()
    with app.app_context():
        from src.models import models, tags
        from src.models.basemodel import Base
        Base.create_all()
def test_create_row():
    global app
    if app is None:
        app = src.create_app()
    new_row = CharacterModel()
    new_row.slug = "test"
    with app.app_context():
        crud.create_row(new_row)
def test_read_row():
    global app
    if app is None:
        app = src.create_app()
    with app.app_context():
        results = crud.read_row_by_id(CharacterModel, 1).one()
        assert results.slug == "test"
def test_update_row():
    global app
    if app is None:
        app = src.create_app()
    updates = {"slug": "hello"}
    with app.app_context():
        crud.update_row_by_id(CharacterModel, 1, updates)
        results = crud.read_row_by_id(CharacterModel,1).one()
        assert results.slug == "hello"
def test_delete_row():
    global app
    if app is None:
        app = src.create_app()
    with app.app_context():
        crud.delete_row_by_id(CharacterModel, 1)
        results = crud.read_row_by_id(CharacterModel,1).one_or_none()
        assert results is None
def test_create_rows():
    global app
    if app is None:
        app = src.create_app()
    with app.app_context():
        crud.execute_sql('ALTER SEQUENCE "character_models_sequence" RESTART WITH 1')
        models = []
        for i in range(0,10):
            model = CharacterModel()
            model.slug = "test_" + str(i+1)
            models.append(model)
        crud.create_rows(*models)
    
def test_delete_tables():
    global app
    if app is None:
        app = src.create_app()
    with app.app_context():
        from src.models.basemodel import Base
        Base.drop_all()
    