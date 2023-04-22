from server import app
import subprocess

gunicorn_command = [
    'gunicorn', 
    'server:app',  
    '-b', '0.0.0.0:4000',  
    '-w', '4', 
]


subprocess.run(gunicorn_command)