from Controller_server import app, socketio
from flask_socketio import send, emit
from pynput.keyboard import Key, Controller
#from time import time

keyboard = Controller()

di = {"up": Key.up,
      "down": Key.down,
      "left": Key.left,
      "right": Key.right,
      "space": Key.space}

def press_button(key):
    keyboard.press(di[key])
def release_button(key):
    keyboard.release(di[key])

@app.route("/") #Just for checking connection to the server in general
def connection():
    print("Connected to http")
    return("http connected \n")

@socketio.on("message") #basically only for confirmation message
def handle_message(msg):
    print("Message: " +  msg)
    send("Message : " + msg, broadcast=True)

@socketio.on("button")
def handle_button_press(data):
    if data["action"] == "press":
        press_button(data["key"])
    if data["action"] == "release":
        release_button(data["key"])

@socketio.on("pings") #Don't judge
def handle_ping(d):
    socketio.emit("reping", {"ping": d["time"]}, room=d["client"])
