from Controller_server import app, socketio
from flask_socketio import send, emit
from pynput.keyboard import Key, Controller


keyboard = Controller()

di = {"up": Key.up,
      "down": Key.down,
      "left": Key.left,
      "right": Key.right,
      "space": Key.space,
      "A": Key.space,
      "B": "b",
      "X": "x",
      "Y": "y"}

def press_button(key):
    print(key)
    keyboard.press(di[key])
def release_button(key):
    keyboard.release(di[key])
    pass

@app.route("/")
def connection():
    print("Connected to http")
    return("http connected \n")

@socketio.on("message")
def handle_message(msg):
    print("Message: " +  msg)
    send("Message : " + msg, broadcast=True)

@socketio.on("button")
def handle_button_press(data):
    if data["action"] == "press":
        press_button(data["key"].replace(".", ""))
    if data["action"] == "release":
        release_button(data["key"].replace(".", ""))

@socketio.on("pings")
def handle_ping(d):
    socketio.emit("reping", {"ping": d["time"]}, room=d["client"])



