const express = require("express");

const Router = express.Router();
const DataController = require("../controllers/DataController");
const dataController = new DataController();

Router.get("/", dataController.getData);

module.exports = Router;
