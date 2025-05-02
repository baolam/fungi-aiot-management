const shortid = require("shortid");
const Harvest = require("../models/harvest.models");
const Data = require("../models/data.models");
const Disease = require("../models/disease.models");
const { FungiInfor, FungiInforStage } = require("../models/fungi.infor.models");
const { HarvestControlHistory } = require("../models/history.models");

class HarvestController {
  async createHarvest(req, res) {
    try {
      const id = shortid.generate();
      const fungiId = parseInt(req.body.fungiId);

      if (isNaN(fungiId)) {
        return res.json({ message: "Failed to create due to fungiId is NULL" });
      }

      /// Mã current_stage là 0 (nghĩa là chưa khởi tạo)
      await Harvest.create({
        id,
        fungiId,
        current_stage: 0,
        current_disease: 0,
      });

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

      const additional_data = {
        fungi: (
          await FungiInfor.findOne({ where: { id: rawData.fungiId } })
        ).toJSON(),
        stage:
          rawData.current_stage === 0
            ? {}
            : (
                await FungiInforStage.findOne({
                  where: { id: rawData.current_stage },
                })
              ).toJSON(),
        disease:
          rawData.current_disease === 0
            ? {}
            : await Disease.findOne({ where: { id: rawData.current_disease } }),
      };

      rawData.data = rawData.data.map((point) => {
        return { ...point, updatedAt: undefined, id: undefined };
      });

      rawData.additional = additional_data;

      res.json(rawData);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  }

  async getBriefHarvest(req, res) {
    try {
      const raw_data = await Harvest.findAll();
      const data = raw_data.map((raw) => raw.toJSON());
      for (let i = 0; i < data.length; i++) {
        data[i].fungi = (
          await FungiInfor.findOne({ where: { id: data[i].fungiId } })
        ).toJSON().name;

        if (data[i].current_stage !== 0) {
          data[i].stage = (
            await FungiInforStage.findOne({
              where: { id: data[i].current_stage },
            })
          ).toJSON().name;
        } else {
          data[i].stage = "Not assigned";
        }

        if (data[i].current_disease !== 0) {
          data[i].disease = (
            await Disease.findOne({ where: { id: data[i].current_disease } })
          ).toJSON().name;
        } else {
          data[i].disease = "Not assigned!";
        }
      }

      res.json(data);
    } catch (err) {
      console.log(err);
      res.json([]);
    }
  }

  async updateStage(req, res) {
    try {
      const { id, current_stage } = req.body;
      const exist = (await Harvest.findOne({ where: { id } })) !== null;
      if (!exist)
        return res.json({ message: "Did't exist, failed to update!" });

      await Harvest.update({ current_stage }, { where: { id } });
      res.json({ message: "Update successfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to update!" });
    }
  }

  async updateDisease(req, res) {
    try {
      const { id, current_disease } = req.body;
      const exist = (await Harvest.findOne({ where: { id } })) !== null;
      if (!exist)
        return res.json({
          err: true,
          message: "Did't exist, failed to update!",
        });

      await Harvest.update({ current_disease }, { where: { id } });
      res.json({ err: false, message: "Update successfully!" });
    } catch (err) {
      console.log(err);
      res.json({ err: true, message: "Failed to update!" });
    }
  }
}

module.exports = HarvestController;
