const express = require("express");

const Router = express.Router();
const DiseaseController = require("../controllers/DiseaseController");
const diseaseController = new DiseaseController();

Router.get("/:fungiId", diseaseController.getDisease);
Router.post("/", diseaseController.addNewDisease);

module.exports = Router;
