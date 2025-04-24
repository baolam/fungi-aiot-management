from dotenv import load_dotenv
load_dotenv("config.env")

import os
import threading

NAMESPACE = os.getenv("PYTHON_NAMESPACE")
SERVER_ADDRESS = os.getenv("JS_SERVER_ADDRESS")
MQTT_HOST = os.getenv("MQTT_HOST")
MQTT_PORT = int(os.getenv("MQTT_PORT"))
ALLOW_DISCONNECT_WHEN_CATCH_EVENT = False

interupt_event = threading.Event()