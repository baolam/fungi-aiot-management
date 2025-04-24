const express = require("express");

const Router = express.Router();
const HarvestController = require("../controllers/HarvestController");
const harvestController = new HarvestController();

Router.post("/", harvestController.createHarvest);
Router.get("/:harvest", harvestController.getHarvest);

module.exports = Router;
