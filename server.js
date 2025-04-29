const http = require("http");
const path = require("path");
const { config } = require("dotenv");

const express = require("express");
const ip = require("ip");
const socketio = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");

config({ path: path.join(__dirname, "config.env") });

const PORT = process.env.PORT || 3000;
const IPADDR = ip.address();

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: { origin: "*" },
});

app.use(cors({ origin: "*" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

/// Đảm bảo một số Route dùng cho xử lí đường dẫn
app.use("/api", require("./js/routes/routes"));

/// Kết nối với layout
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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
