const express = require("express");

const Router = express.Router();
const HarvestController = require("../controllers/HarvestController");
const harvestController = new HarvestController();

Router.post("/", harvestController.createHarvest);
Router.put("/stage", harvestController.updateStage);
Router.put("/disease", harvestController.updateDisease);
Router.get("/", harvestController.getBriefHarvest);
Router.get("/:harvest", harvestController.getHarvest);

module.exports = Router;
