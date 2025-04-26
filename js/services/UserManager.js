class UserManager {
  constructor() {
    this._io = null;
  }

  assginIo(io) {
    this._io = io;
    io.on("connection", (socket) => {
      console.log("Having a connection from User. Maintained!");

      socket.on("disconnect", () => {
        console.log("Disconnected to User. User emits this event!");
      });
    });
  }

  #getPythonManager() {
    return require("./PythonManager");
  }
}

const user = new UserManager();
module.exports = user;
