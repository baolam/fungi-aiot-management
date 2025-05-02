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

      socket.on("diagnose-disease", (data) => {
        this.#getPythonManager()._io.emit("diagnose-disease", data);
      });

      socket.on("query-curious", (queryInfor) => {
        this.#getPythonManager()._io.emit("query", queryInfor);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected to User. User emits this event!");
      });
    });
  }

  #onManualControl(data) {
    const { harvestId, water, fan, brightness } = data;
    const formatMessage = `${harvestId}|${brightness}|${water}|${fan}`;

    console.log(`Send message ${formatMessage} to device!`);
    this.#getDeviceManager()._client.publish("device/control", formatMessage);
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
