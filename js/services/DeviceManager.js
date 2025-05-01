const mqtt = require("mqtt");
const mqtt_address = `http://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const Harvest = require("../models/harvest.models");
const Data = require("../models/data.models");
const Rule = require("../models/rule.models");
const Script = require("../models/script.models");
const { HarvestControlHistory } = require("../models/history.models");

class DeviceManager {
  constructor() {
    this.management = {
      harvest: {},
    };

    this._client = mqtt.connect(mqtt_address);
    this._client.on("connect", () => this.#onConnect());
    this._client.on("message", (topic, payload) =>
      this.#onMessage(topic, payload)
    );
    this._client.on("offline", () => this.#onOffline("unknown"));
  }

  #onConnect() {
    console.log(
      "Maintain a connection to Mosquitto (bridge between device and this program) successfully!"
    );
    this._client.subscribe("device/data");
    this._client.subscribe("device/control");
    this._client.subscribe("device/initalize");
  }

  async #onTopicReviceData(_data) {
    const message = String(_data).split("|");
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

    /// Đã đảm bảo là HarvestID hợp lí he
    const data = { temperature, humidity, light, harvest: harvestId };
    const resp = (await Data.create(data)).toJSON();

    /// Tiến hành gửi ngược dữ liệu thông báo lên giao diện
    this.#getUserManager()._io.emit("new-data", resp);
  }

  async #onTopicControlData(_data) {
    const message = String(_data).split("|");
    if (message.length !== 4) {
      console.log("Wrong format message!");
      return;
    }

    const harvestId = message[0];
    const brightness = parseFloat(message[1]);
    const water = parseFloat(message[2]);
    const fan = parseFloat(message[3]);

    if (isNaN(brightness) || isNaN(water) || isNaN(fan)) return;

    console.log(
      `Harvest Id: ${harvestId}, Brightness: ${brightness}, Water: ${water}, Fan: ${fan}`
    );

    const data = { harvest: harvestId, brightness, water, fan };
    const resp = (await HarvestControlHistory.create(data)).toJSON();

    /// Gửi dữ liệu lên quản lí
    this.#getUserManager()._io.emit("new-control", resp);
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

      this.management.harvest[harvest] = {};
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
      case "device/offline":
        this.#onOffline(payload.toString());
        break;
      default:
        console.log("No assign topic handler!");
        break;
    }
  }

  #onOffline(harvest) {
    console.log("Mosquitto offline!, ", harvest);
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
