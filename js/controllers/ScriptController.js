const Script = require("../models/script.models");
const Rule = require("../models/rule.models");

class ScriptController {
  async addNewScript(req, res) {
    try {
      const { fungiId, diseaseId, stageId, name, description } = req.body;
      const exist =
        (await Script.findOne({ where: { fungiId, diseaseId, stageId } })) !==
        null;
      if (exist) {
        return res.json({
          message: "Failed to add new script, existed before!",
        });
      }

      await Script.create({ fungiId, diseaseId, stageId, name, description });
      res.json({ message: "Add successfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to add new script!, unexpected error" });
    }
  }

  async _getScriptBy(req, res, where_attr) {
    try {
      const data = (
        await Script.findOne({
          where: where_attr,
          include: [
            {
              model: Rule,
              as: "rules",
            },
          ],
        })
      ).toJSON();

      data.rules = data.rules.map((rule) => rule.id);
      res.json(data);
    } catch (err) {
      console.log(err);
      return res.json({});
    }
  }

  async getScript(req, res) {
    const { fungiId, diseaseId, stageId } = req.params;
    await this._getScriptBy(req, res, { fungiId, diseaseId, stageId });
  }

  async getScriptByFungiId(req, res) {
    try {
      const { fungiId } = req.params;
      const raw_data = await Script.findAll({
        where: { fungiId },
        include: [
          {
            model: Rule,
            as: "rules",
          },
        ],
      });
      const data = raw_data.map((raw) => raw.toJSON());
      res.json(data);
    } catch (err) {
      console.log(err);
      res.json([]);
    }
  }
}

module.exports = ScriptController;
