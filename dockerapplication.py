"""
application.py is used to set up application and run when called from command line
"""
#operating system  python API's
import src
import click
import os
#creating click command to quickly configure application at runtime 
@click.command()
@click.option('--mode', default='production', help = 'Mode to run application \n \
    recognized modes : \n \
        development \n \
        production')
@click.option('--initdb', default=0 , help = "when set to 1 db will be initialised on application creation" )
def run(mode,initdb):
    """run application with values from click commands"""
    app = src.create_app(mode, initdb, 
    static_path = os.path.realpath('./static'),
    template_path = os.path.realpath('./templates'))
    app.run(host="0.0.0.0", port=80)
if __name__ == "__main__":
    run()
