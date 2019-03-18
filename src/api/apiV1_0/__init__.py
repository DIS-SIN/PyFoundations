from flask import Blueprint
from flask_restful import Api
def register_routes(app, latest=False):
    api_bp = Blueprint('apiV1.0', __name__)
    if latest:
        api = Api(api_bp, prefix= '/api' )
    else:
        api = Api(api_bp, prefix='/api/V1.0')
    
   

