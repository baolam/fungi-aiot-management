from ..constant import *
from ..manager.device_manager import client

def _on_device_data(payload : str):
    harvest_id, temperature, humidity, light = payload.split("|")
    
    try:
        temperature = int(temperature)
        humidity = int(humidity)
        light = int(light)

        pass
    except:
        pass

def on_message(client, userdata, msg):
    # print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
    topic = msg.topic
    payload : str = msg.payload.decode()
    if topic == "device/data":
        _on_device_data(payload)

client.on_message = on_message