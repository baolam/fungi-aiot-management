const express = require("express");
const path = require("path");

const Router = express.Router();
const fuzzy_rules = require("../config/data.convention.json");

Router.get("/fuzzy-rules", (req, res) => {
  res.json(fuzzy_rules);
});

Router.use("/fungi", require("./fungi.routes"));
Router.use("/data", require("./data.routes"));
Router.use("/harvest", require("./harvest.routes"));
Router.use("/rule", require("./rule.routes"));
Router.use("/disease", require("./disease.routes"));
Router.use("/script", require("./script.routes"));
Router.use("/notification", require("./notification.routes"));

module.exports = Router;
