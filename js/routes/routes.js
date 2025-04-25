const express = require("express");
const Router = express.Router();

Router.use("/fungi", require("./fungi.routes"));
Router.use("/data", require("./data.routes"));
Router.use("/harvest", require("./harvest.routes"));
Router.use("/rule", require("./rule.routes"));
Router.use("/disease", require("./disease.routes"));
Router.use("/script", require("./script.routes"));

module.exports = Router;
