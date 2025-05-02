import paho.mqtt.client as mqtt
import socketio
import numpy as np
import threading

from typing import Dict, Any
from skfuzzy import control as ctrl

harvest : Dict[int, Dict[str, Any | ctrl.ControlSystemSimulation]] = {}
fuzzy_rules = {}

interupt_event = threading.Event()
device_client = mqtt.Client()
js_sio = socketio.Client()

temperature = ctrl.Antecedent(np.arange(0, 51, 0.2), "temperature")
humidity = ctrl.Antecedent(np.arange(0, 101, 0.5), "humidity")
light = ctrl.Antecedent(np.arange(0, 101, 0.5), "light")

fan_speed = ctrl.Consequent(np.arange(0, 101, 0.25), "fan_speed")
brightness = ctrl.Consequent(np.arange(0, 101, 0.25), "brightness")
control_levels = ctrl.Consequent(np.arange(0, 101, 0.25), "control_levels")

from .brain.definition import *
from .brain.rule import retrieve_rules

print("Retrieving rule...")
fuzzy_rules = retrieve_rules()
print("Retrieved successfully!")