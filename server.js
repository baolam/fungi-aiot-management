const http = require("http");
const path = require("path");
const { config } = require("dotenv");

const express = require("express");
const ip = require("ip");
const socketio = require("socket.io");

config({ path: path.join(__dirname, "config.env") });

const PORT = process.env.PORT || 3000;
const IPADDR = ip.address();

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/// Đảm bảo một số Route dùng cho xử lí đường dẫn
app.use("/api", require("./js/routes/routes"));

/// Đảm bảo duy trì kết nối tới Python
require("./js/services/PythonManager").assginIo(
  io.of(process.env.PYTHON_NAMESPACE)
);

/// Nhánh gửi dữ liệu quản lí tức thì ở người dùng
require("./js/services/UserManager").assginIo(
  io.of(process.env.USER_NAMESPACE)
);

/// Đảm bảo duy trì kết nối tới thiết bị
require("./js/services/DeviceManager");

server.listen(PORT, async () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`You can access to this through http://${IPADDR}:${PORT}`);
  await require("./js/models/config.models")();
});
