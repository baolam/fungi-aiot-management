const express = require("express");

const Router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const notificationController = new NotificationController();

module.exports = Router;
