const express = require("express");
const Router = express.Router();

Router.use("/fungi", require("./fungi.routes"));
Router.use("/data", require("./data.routes"));
Router.use("/harvest", require("./harvest.routes"));

module.exports = Router;
