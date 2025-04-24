const { FungiInfor, FungiInforStage } = require("../models/fungi.infor.models");

class FungiController {
  async addNewFungi(req, res) {
    try {
      const { name } = req.body;
      const exist = (await FungiInfor.findOne({ where: { name } })) !== null;
      if (exist) {
        return res.json({
          message: "Failed to add due to this fungi exist before!",
        });
      }
      await FungiInfor.create(req.body);
      res.json({ message: "Add sucessfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to add. Unexpected error" });
    }
  }

  async #addOneStage(stage) {
    try {
      const { name } = stage;
      const exist =
        (await FungiInforStage.findOne({ where: { name } })) !== null;
      if (exist) {
        return false;
      }
      await FungiInforStage.create(stage);
      return true;
    } catch (err) {
      return false;
    }
  }

  async addNewStages(req, res) {
    try {
      const { fungiId } = req.params;
      const { stages } = req.body;

      const exist =
        (await FungiInfor.findOne({ where: { id: parseInt(fungiId) } })) !==
        null;
      if (!exist) {
        return res.json({ message: "FungiInfor not existed!" });
      }

      const storageStages = stages.map((stage) => {
        return { ...stage, fungiId: parseInt(fungiId) };
      });

      for (let i = 0; i < storageStages.length; i++) {
        let add_successfully = await this.#addOneStage(storageStages[i]);
        if (!add_successfully) {
          return res.json({
            message: "Failed to add due to one stage exist before!",
          });
        }
      }

      res.json({ message: "Add successfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to add. Unexpected error" });
    }
  }

  async getFungiInfor(req, res) {
    try {
      const { fungiId } = req.params;
      const fungiInfor = (
        await FungiInfor.findOne({
          where: { id: parseInt(fungiId) },
          include: [
            {
              model: FungiInforStage,
              as: "stages",
            },
          ],
        })
      ).toJSON();
      res.json(fungiInfor);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  }
}

module.exports = FungiController;
