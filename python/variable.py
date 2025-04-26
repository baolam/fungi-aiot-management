import paho.mqtt.client as mqtt
import socketio
import numpy as np
import threading
from skfuzzy import control as ctrl

harvest = {}
fuzzy_rules = {}

interupt_event = threading.Event()
device_client = mqtt.Client()
js_sio = socketio.Client()

temperature = ctrl.Antecedent(np.arange(0, 50, 0.2), "temperature")
humidity = ctrl.Antecedent(np.arange(0, 100, 0.5), "humidity")
light = ctrl.Antecedent(np.arange(0, 100, 0.5), "light")

# fan_speed = ctrl.Antecedent(np.arange(0, 100, 0.5), "fan_speed")
# brightness = ctrl.Antecedent(np.arange(0, 100, 0.5), "brightness")
control_levels = ctrl.Antecedent(np.arange(0, 100, 0.5), "control_levels")

from .brain.definition import *
from .brain.rule import retrieve_rules

print("Retrieving rule...")
fuzzy_rules = retrieve_rules()
print(fuzzy_rules)
print("Retrieved successfully!")