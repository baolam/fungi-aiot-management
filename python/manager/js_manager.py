import threading
import socketio

from ..constant import *

sio = socketio.Client()

def disconnect_to_js():
    interupt_event.set()
    sio.disconnect()

def connect_to_js():
    sio.connect(SERVER_ADDRESS, namespaces=[NAMESPACE])
    sio.wait()

def on_connect_to_js():
    print("Connected to JS!")

sio.on("connect", handler=on_connect_to_js, namespace=NAMESPACE)

js_thread = threading.Thread(name="JS thread", target=connect_to_js)