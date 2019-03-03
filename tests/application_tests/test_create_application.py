from flask import Flask
import src
import os
def test_create_application():
    app = src.create_app(static_path= os.path.join('../static'),
    template_path= os.path.join('../templates'))
    assert isinstance(app, Flask)