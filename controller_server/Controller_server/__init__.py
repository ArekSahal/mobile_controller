from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import eventlet

app = Flask(__name__)
eventlet.monkey_patch()
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

#Also init any other thing like data base and stuff

from Controller_server import routes


