const express = require("express");

const Router = express.Router();
const RuleController = require("../controllers/RuleController");
const ruleController = new RuleController();

module.exports = Router;
