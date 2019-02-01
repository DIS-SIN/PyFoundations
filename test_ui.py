from flask import Flask, redirect, url_for
import os
from code import testui_pyfoundations

# ULTRABASIC TEMPLATE RENDERER
# So the UI guy can build somewhat useable templates
# from the get go. Easier to integrate afterwards

app_set_debug_mode = 0  # 0=none,1=entry,2=entry/exit,3=all

def create_app():
    app = Flask(__name__)
    app.register_blueprint(testui_pyfoundations.bp)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    @app.route('/')
    def index():
        return redirect(url_for('pyfoundations.render_home'))
    return app
app = create_app()

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5054)