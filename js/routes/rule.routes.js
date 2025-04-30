const express = require("express");

const Router = express.Router();
const RuleController = require("../controllers/RuleController");
const ruleController = new RuleController();

Router.get("/:scriptId", ruleController.getRules);
Router.post("/", ruleController.addRule);

module.exports = Router;
