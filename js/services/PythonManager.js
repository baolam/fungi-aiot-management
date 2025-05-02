const Disease = require("../models/disease.models");

class PythonManager {
  constructor() {
    this._io = null;
  }

  assginIo(io) {
    this._io = io;
    io.on("connection", (socket) => {
      console.log("Having a connection from Python. Maintained!");

      socket.on("finish-initalize", () => this.#onFinishInitalize(socket));

      socket.on("diagnose-disease-result", (resp) =>
        this.#onHandlingDiagnoseDisease(resp)
      );

      socket.on("query-result", (resp) => this.#onHandlingQueryInfor(resp));

      socket.on("disconnect", () => {
        console.log("Disconnected to Python. Python emits this event!");
      });
    });
  }

  #onFinishInitalize(socket) {
    console.log("Python finished initalize!");

    const infors = this.#getDeviceManager().management.harvest;
    const harvests = Object.keys(infors);

    if (harvests.length === 0) console.log("No harvest found!");
    else console.log("Total harvest's scripts: ", harvests.length);

    for (let i = 0; i < harvests.length; i++) {
      socket.emit("harvest-initalize", infors[harvests[i]].python);
    }
  }

  async #onHandlingDiagnoseDisease(resp) {
    if (resp.length === 0) {
      this.#getUserManager()._io.emit("diagnose-disease", []);
      return;
    }

    const result = [];
    for (let i = 0; i < resp.length; i++) {
      const disease = (
        await Disease.findOne({ where: { id: resp[i][0] } })
      ).toJSON();
      const expected = { ...disease, score: resp[i][1] };
      result.push(expected);
    }

    this.#getUserManager()._io.emit("diagnose-disease", result);
  }

  async #onHandlingQueryInfor(resp) {
    this.#getUserManager()._io.emit("query", resp);
  }

  #getUserManager() {
    return require("./UserManager");
  }

  #getDeviceManager() {
    return require("./DeviceManager");
  }
}

const python = new PythonManager();
module.exports = python;
