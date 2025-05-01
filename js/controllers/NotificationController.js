const Notifications = require("../models/notification.models");

class NotificationController {
  async getNotifications(req, res) {
    try {
      const { fungiId } = req.params;
      const raw_data = await Notifications.findAll({ where: { fungiId } });
      const data = raw_data.map((raw) => raw.toJSON());
      res.json(data);
    } catch (err) {
      console.log(err);
      res.json([]);
    }
  }
}

module.exports = NotificationController;
