const Rule = require("../models/rule.models");

class RuleController {
  async addRule(req, res) {
    try {
      const { name, description, input_rule, output_rule, scriptId } = req.body;

      /// Để cho bài toán đơn giản, hãy giả sử biểu thức logic là hợp lí
      const exist =
        (await Rule.findOne({ where: { input_rule, name } })) !== null;
      if (exist) {
        return res.json({
          message: "Failed to add new Rule due to its existence before!",
        });
      }

      await Rule.create({
        name,
        description,
        input_rule,
        output_rule,
        scriptId,
      });

      res.json({ message: "Add succesfully!" });
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to add new Rule!" });
    }
  }

  async getRules(req, res) {
    try {
      const { scriptId } = req.params;
      const raw_data = await Rule.findAll({ where: { scriptId } });
      const data = raw_data.map((raw) => raw.toJSON());
      res.json(data);
    } catch (err) {
      console.log(err);
      res.json({ message: "Failed to retrieve rules!" });
    }
  }
}

module.exports = RuleController;
