const mqtt = require("mqtt");
const mqtt_address = `http://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

class DeviceManager {
  constructor() {
    this._client = mqtt.connect(mqtt_address);
    this._client.on("connect", () => this.#onConnect());
    this._client.on("message", (topic, payload) =>
      this.#onMessage(topic, payload)
    );
    this._client.on("offline", () => this.#onOffline());
  }

  #onConnect() {
    console.log(
      "Maintain a connection to Mosquitto (bridge between device and this program) successfully!"
    );
    this._client.subscribe("device/data");
    this._client.subscribe("device/control");
  }

  #onTopicReviceData(data) {
    const message = String(data).split("|");
    if (message.length !== 4) {
      console.log("Wrong format message!");
      return;
    }
    const harvestId = message[0];
    const temperature = parseFloat(message[1]);
    const humidity = parseFloat(message[2]);
    const light = parseFloat(message[3]);

    if (isNaN(temperature) || isNaN(humidity) || isNaN(light)) return;

    console.log(
      `Harvest Id: ${harvestId}, Temp: ${temperature}*C, Humid: ${humidity}%, Light: ${light}`
    );
  }

  #onTopicControlData(data) {
    console.log(data);
  }

  #onMessage(topic, payload) {
    console.log(`Received from [${topic}]: ${payload.toString()}`);
    switch (topic) {
      case "device/data":
        this.#onTopicReviceData(payload.toString());
        break;
      case "device/control":
        this.#onTopicControlData(payload.toString());
        break;
      default:
        console.log("No assign topic handler!");
        break;
    }
  }

  #onOffline() {
    console.log("Mosquitto offline!");
  }
}

const device_manager = new DeviceManager();
module.exports = device_manager;
