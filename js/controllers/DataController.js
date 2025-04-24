const Data = require("../models/data.models");

class DataController {
  async getData(req, res) {
    try {
      const nums = parseInt(req.query.nums);
      const harvest = req.query.harvest;

      if (isNaN(nums)) {
        return res.json({ data: [] });
      }

      const rawData = await Data.findAll({
        where: { harvest },
        limit: nums,
        order: [["createdAt", "DESC"]],
      });

      res.json({
        data: rawData.map((point) => {
          return { ...point, updatedAt: undefined, id: undefined };
        }),
      });
    } catch (err) {
      console.log(err);
      res.json({ data: [] });
    }
  }
}

module.exports = DataController;
