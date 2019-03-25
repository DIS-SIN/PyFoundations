from src import create_app
import os
app = create_app("development", True, 
    static_path = os.path.realpath('./static'),
    template_path = os.path.realpath('./templates'))
    
