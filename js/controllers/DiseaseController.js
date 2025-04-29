const Disease = require("../models/disease.models");

class DiseaseController {
  async addNewDisease(req, res) {
    try {
      const { fungiId, name, description } = req.body;
      const exist =
        (await Disease.findOne({ where: { fungiId, name } })) !== null;
      if (exist) {
        return res.json({ message: "Failed to add, it existed before!" });
      }

      await Disease.create({ fungiId, name, description });
      res.json({ message: "Add successfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to add, unexpected error!" });
    }
  }

  async getDisease(req, res) {
    try {
      const { fungiId } = req.params;
      const raw_data = await Disease.findAll({ where: { fungiId } });
      const data = raw_data.map((raw) => raw.toJSON());
      res.json(data);
    } catch (err) {
      console.log(err);
      res.json([]);
    }
  }
}

module.exports = DiseaseController;
