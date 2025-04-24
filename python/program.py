import sys
import signal
from .constant import *
from .manager.js_manager import disconnect_to_js, sio, js_thread
from .manager.device_manager import disconnect_to_mqtt, client, device_thread
from .brain.rule import disconnect_to_db

def on_disconnect_to_js():
    print("Disconnected to JS!")
    
def on_disconnect_to_mqtt(client=None, userData=None, v1_rc=None):
    print("Disconnected to MQTT!")

def stop_program(a=None, b=None):
    print("Disconnect to server and stop program!")
    interupt_event.set()

    disconnect_to_js()
    disconnect_to_mqtt()
    disconnect_to_db()
    
    sys.exit(0)

def start_manager():
    js_thread.start()
    device_thread.start()

sio.on("disconnect", handler=on_disconnect_to_js, namespace=NAMESPACE)
client.on_disconnect = on_disconnect_to_mqtt

signal.signal(signal.SIGINT, stop_program)
signal.signal(signal.SIGTERM, stop_program)
