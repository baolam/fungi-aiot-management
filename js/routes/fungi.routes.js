const express = require("express");
const Router = express.Router();

const FungiController = require("../controllers/FungiController");
const fungiController = new FungiController();

Router.post("/", fungiController.addNewFungi);
Router.post("/stage/:fungiId", (req, res) =>
  fungiController.addNewStages(req, res)
);

Router.get("/", fungiController.getAllFungis);
Router.get("/:fungiId", fungiController.getFungiInfor);

module.exports = Router;
