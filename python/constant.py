from dotenv import load_dotenv
load_dotenv("config.env")

import os

NAMESPACE = os.getenv("PYTHON_NAMESPACE")
SERVER_ADDRESS = os.getenv("JS_SERVER_ADDRESS")
MQTT_HOST = os.getenv("MQTT_HOST")
MQTT_PORT = int(os.getenv("MQTT_PORT"))
ALLOW_DISCONNECT_WHEN_CATCH_EVENT = False
DATABASE_NAME = os.getenv("DATABASE_NAME")
OR_CONVENTION = os.getenv("OR_CONVENTION")
NOT_CONVENTION = os.getenv("NOT_CONVENTION")
DATA_CONVENTION_FILE = os.path.join(os.getcwd(), os.getenv("DATA_CONVENTION_FILE"))