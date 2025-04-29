const express = require("express");

const Router = express.Router();
const ScriptController = require("../controllers/ScriptController");
const scriptController = new ScriptController();

Router.post("/", scriptController.addNewScript);
Router.get("/:fungiId", (req, res) =>
  scriptController.getScriptByFungiId(req, res)
);
Router.get("/:fungiId/:diseaseId/:stageId", (req, res) =>
  scriptController.getScript(req, res)
);

module.exports = Router;
