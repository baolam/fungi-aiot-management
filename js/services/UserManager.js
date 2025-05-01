class UserManager {
  constructor() {
    this._io = null;
  }

  assginIo(io) {
    this._io = io;
    io.on("connection", (socket) => {
      console.log("Having a connection from User. Maintained!");

      setTimeout(() => {
        socket.emit(
          "harvest-onlines",
          this.#getDeviceManager().management.harvest
        );
      }, 1000);

      socket.on("manual-control", (data) => this.#onManualControl(data));

      socket.on("disconnect", () => {
        console.log("Disconnected to User. User emits this event!");
      });
    });
  }

  #onManualControl(data) {
    this.#getDeviceManager()._client.emit("device/control", data);
  }

  #getPythonManager() {
    return require("./PythonManager");
  }

  #getDeviceManager() {
    return require("./DeviceManager");
  }
}

const user = new UserManager();
module.exports = user;
