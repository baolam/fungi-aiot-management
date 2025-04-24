const shortid = require("shortid");
const Harvest = require("../models/harvest.models");
const Data = require("../models/data.models");
const { HarvestControlHistory } = require("../models/history.models");

class HarvestController {
  async createHarvest(req, res) {
    try {
      const id = shortid.generate();
      const fungiId = parseInt(req.body.fungiId);

      if (isNaN(fungiId)) {
        return res.json({ message: "Failed to create due to fungiId is NULL" });
      }

      /// Mã current_stage là -1 (nghĩa là chưa khởi tạo)
      await Harvest.create({ id, fungiId, current_stage: -1 });

      res.json({ message: "Add successfully!", id });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to create. Unexpected error!" });
    }
  }

  async getHarvest(req, res) {
    try {
      let nums = parseInt(req.query.nums);
      if (isNaN(nums)) {
        /// Lấy 15 điểm dữ liệu
        nums = 15;
      }

      const { harvest } = req.params;
      const rawData = (
        await Harvest.findOne({
          where: { id: harvest },
          include: [
            {
              model: HarvestControlHistory,
              as: "control",
              limit: nums,
              order: [["createdAt", "DESC"]],
            },
            {
              model: Data,
              as: "data",
              limit: nums,
              order: [["createdAt", "DESC"]],
            },
          ],
        })
      ).toJSON();

      rawData.data = rawData.data.map((point) => {
        return { ...point, updatedAt: undefined, id: undefined };
      });

      res.json(rawData);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  }
}

module.exports = HarvestController;
