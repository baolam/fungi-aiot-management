const mqtt = require("mqtt");
const mqtt_address = `http://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const Harvest = require("../models/harvest.models");
const Rule = require("../models/rule.models");
const Script = require("../models/script.models");

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
    this._client.subscribe("device/initalize");
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

  async #onTopicInitalizeDevice(harvest) {
    try {
      const { fungiId, current_stage, current_disease } = (
        await Harvest.findOne({
          where: { id: harvest },
        })
      ).toJSON();

      const temp = (
        await Script.findOne({
          where: {
            fungiId,
            diseaseId: current_disease,
            stageId: current_stage,
          },
          include: [
            {
              model: Rule,
              as: "rules",
            },
          ],
        })
      ).toJSON();

      const expected_result = {
        harvest,
        rules: temp.rules.map((rule) => rule.id),
      };

      /// Tiến hành gửi dữ liệu quản lí
      this.#getPythonManager()._io.emit("harvest-initalize", expected_result);
      this.#getUserManager()._io.emit("harvest-online", harvest);
    } catch (err) {
      console.log("Unexpected error.");
      console.log(err);
    }
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
      case "device/initalize":
        this.#onTopicInitalizeDevice(payload.toString());
        break;
      default:
        console.log("No assign topic handler!");
        break;
    }
  }

  #onOffline() {
    console.log("Mosquitto offline!");
  }

  #getUserManager() {
    return require("./UserManager");
  }

  #getPythonManager() {
    return require("./PythonManager");
  }
}

const device_manager = new DeviceManager();
module.exports = device_manager;
