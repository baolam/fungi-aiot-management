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
EMBED_MODEL_NAME = os.getenv("EMBED_MODEL_NAME")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
DATABASE_PATH = "sqlite:///" + os.path.join(os.getcwd(), DATABASE_NAME)
BUILT_STORAGE = False if os.getenv("BUILT_STORAGE") == '0' else True
VECTOR_STORAGE = os.getenv("VECTOR_STORAGE")
DIAGNOSE_DISEASE_STORAGE = os.getenv("DIAGNOSE_STORAGE")
THRESHOLD_DIAGNOSE_DISEASE = float(os.getenv("THRESHOLD_DIAGNOSE_DISEASE"))