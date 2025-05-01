class PythonManager {
  constructor() {
    this._io = null;
  }

  assginIo(io) {
    this._io = io;
    io.on("connection", (socket) => {
      console.log("Having a connection from Python. Maintained!");

      socket.on("finish-initalize", () => this.#onFinishInitalize(socket));

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

  #getUserManager() {
    return require("./UserManager");
  }

  #getDeviceManager() {
    return require("./DeviceManager");
  }
}

const python = new PythonManager();
module.exports = python;
