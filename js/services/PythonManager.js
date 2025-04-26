class PythonManager {
  constructor() {
    this._io = null;
  }

  assginIo(io) {
    this._io = io;
    io.on("connection", (socket) => {
      console.log("Having a connection from Python. Maintained!");

      socket.on("disconnect", () => {
        console.log("Disconnected to Python. Python emits this event!");
      });
    });
  }

  #getUserManager() {
    return require("./UserManager");
  }
}

const python = new PythonManager();
module.exports = python;
