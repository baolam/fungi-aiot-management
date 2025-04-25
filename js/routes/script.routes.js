const express = require("express");

const Router = express.Router();
const ScriptController = require("../controllers/ScriptController");
const scriptController = new ScriptController();

Router.post("/", scriptController.addNewScript);
Router.get("/:fungiId/:diseaseId/:stageId", scriptController.getScript);

module.exports = Router;
