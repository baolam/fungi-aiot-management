import paho.mqtt.client as mqtt
import threading
from ..constant import *

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT server successfully!")
    client.subscribe("device/data")


client = mqtt.Client()
client.on_connect = on_connect

def connect_to_mqtt():
    client.connect(MQTT_HOST, MQTT_PORT)
    client.loop_forever()

def disconnect_to_mqtt():
    interupt_event.set()
    client.disconnect()

device_thread = threading.Thread(name="Device management", target=connect_to_mqtt)