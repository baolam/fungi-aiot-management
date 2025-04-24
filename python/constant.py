from dotenv import load_dotenv
load_dotenv("config.env")

import os
import skfuzzy as fuzz
import threading
import numpy as np
from skfuzzy import control as ctrl

NAMESPACE = os.getenv("PYTHON_NAMESPACE")
SERVER_ADDRESS = os.getenv("JS_SERVER_ADDRESS")
MQTT_HOST = os.getenv("MQTT_HOST")
MQTT_PORT = int(os.getenv("MQTT_PORT"))
ALLOW_DISCONNECT_WHEN_CATCH_EVENT = False
DATABASE_NAME = os.getenv("DATABASE_NAME")

interupt_event = threading.Event()

temperature = ctrl.Antecedent(np.arange(0, 50, 0.2), "temperature")
humidity = ctrl.Antecedent(np.arange(0, 100, 0.5), "humidity")
light = ctrl.Antecedent(np.arange(0, 100, 0.5), "light")

# fan_speed = ctrl.Antecedent(np.arange(0, 100, 0.5), "fan_speed")
# brightness = ctrl.Antecedent(np.arange(0, 100, 0.5), "brightness")
control_levels = ctrl.Antecedent(np.arange(0, 100, 0.5), "control_levels")