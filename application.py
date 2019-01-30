from flask import Flask, redirect, url_for
import os
from code import pyfoundations
def create_app():
    app = Flask(__name__)
    app.register_blueprint(pyfoundations.bp)
    @app.route('/')
    def index():
        return redirect(url_for('pyfoundations.render_home'))
    return app
app = create_app()
app.run(host = '0.0.0.0', port=5054)
