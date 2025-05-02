from ..manager.device_manager import client
from ..variable import harvest

def _on_device_data(payload : str):
    harvest_id, temperature, humidity, light = payload.split("|")
    
    try:
        temperature = float(temperature)
        humidity = float(humidity)
        light = float(light)

        control_system = harvest[harvest_id]["system"]
        antecedents = [antecedent.label  for antecedent in control_system.ctrl.antecedents]
        inputs = {
            "temperature" : temperature,
            "humidity" : humidity,
            "light" : light
        }

        for label in antecedents:
            control_system.input[label] = inputs[label]

        # Kiểm tra danh sách các biến
        control_system.compute()

        # Trying to show data
        consequents = [consequent for consequent in control_system.output.keys()]
        outputs = {
            "fan_speed" : 0, # Mã giữ nguyên giá trị trước đó
            "brightness" : 0,
            "control_levels" : 0
        }

        for consequent in consequents:
            outputs[consequent] = control_system.output[consequent]
        
        fan_speed = outputs["fan_speed"]
        brightness = outputs["brightness"]
        control_levels = outputs["control_levels"]

        resp = f"{harvest_id}|{brightness:.2f}|{control_levels:.2f}|{fan_speed:.2f}"
        client.publish("device/control", resp)

    except Exception as e:
        print(f"Error: {e}")

def on_message(client, userdata, msg):
    # print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
    topic = msg.topic
    payload : str = msg.payload.decode()
    if topic == "device/data":
        _on_device_data(payload)

client.on_message = on_message