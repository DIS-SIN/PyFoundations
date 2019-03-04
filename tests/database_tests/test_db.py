import src
import os
from src.database.utils import crud

app = None


def test_create_tables():
    global app
    app = src.create_app()
    with app.app_context():
        from src.models import load_metadata

        load_metadata(app)
        from src.models.basemodel import Base

        Base.create_all()


"""def test_create_row():
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
"""
"""def test_create_rows():
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
def test_read_rows_no_filters():
    global app
    if app is None: 
        app = src.create_app() 
    with app.app_context():
        results = crud.read_rows(CharacterModel)
        count = 0
        for row in results:
            assert row.id == count + 1
            assert row.slug == "test_" + str(count + 1)
            count += 1
def test_read_rows_one_filter():
    global app
    if app is None: 
        app = src.create_app()
    filters = [{
        'id' : {
            'comparitor': '==',
            'data': 3
        }
    }]
    with app.app_context():
        results = crud.read_rows(CharacterModel, filters).one()
        assert results.id == 3 and results.slug == "test_3"
def test_read_rows_and_filters():
    global app
    if app is None: 
        app = src.create_app()
    filters = [
    {
        'slug' : {
            'comparitor' : '==',
            'data': 'test_2'
        },
        'join': 'and'
    },
    {
        'id' : {
            'comparitor' : '==',
            'data' : 2
        },
    }
    ]    
    with app.app_context():
        results = crud.read_rows(CharacterModel, filters).first()
        assert results.id == 2 and results.slug == "test_2" 
def test_read_rows_or_filters():
    global app
    if app is None: 
        app = src.create_app()
    filters = [
    {
        'slug' : {
            'comparitor' : '==',
            'data': 'test_2'
        },
        'join': 'or'
    },
    {
        'id' : {
            'comparitor' : '==',
            'data' : 3
        },
    }
    ]
    with app.app_context():
        results = crud.read_rows(CharacterModel, filters).all()
        assert len(results) > 1
        for row in results:
            assert row.id == 2 or row.id == 3  
def test_read_rows_and_or_filters():
    global app
    if app is None: 
        app = src.create_app()
    filters = [
    {
        'slug' : {
            'comparitor' : '==',
            'data': 'test_2'
        },
        'join': 'and'
    },
    {
        'id' : {
            'comparitor' : '==',
            'data' : 2
        },
        'join': 'or'
    },
    {
        'slug' : {
            'comparitor' : '==',
            'data': 'test_3'
        },
        'join': 'and'
    },
     {
        'id' : {
            'comparitor' : '==',
            'data' : 3
        },
    }
    ]
    with app.app_context():
        results = crud.read_rows(CharacterModel, filters).all()
        assert len(results) > 1
        for row in results:
            assert row.id == 2 or row.id == 3  
def test_delete_tables():
    global app
    if app is None:
        app = src.create_app()
    with app.app_context():
        from src.models.basemodel import Base
        Base.drop_all()
    """
