const express = require("express");

const Router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const notificationController = new NotificationController();

Router.get("/:fungiId", notificationController.getNotifications);

module.exports = Router;
