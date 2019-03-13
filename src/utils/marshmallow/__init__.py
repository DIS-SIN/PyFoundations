def init_marshmallow(app):
    from .baseschema import ma
    ma.init_app(app)