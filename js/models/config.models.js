const { FungiInfor, FungiInforStage } = require("./fungi.infor.models");
const { HarvestControlHistory } = require("./history.models");
const Harvest = require("./harvest.models");
const Data = require("./data.models");
const Rule = require("./rule.models");
const Disease = require("./disease.models");
const Script = require("./script.models");

/// Phần định nghĩa các mối quan hệ dữ liệu
FungiInfor.hasMany(FungiInforStage, {
  foreignKey: "fungiId",
  as: "stages",
});

Harvest.hasMany(Data, {
  foreignKey: "harvest",
  as: "data",
});

Harvest.hasMany(HarvestControlHistory, {
  foreignKey: "harvest",
  as: "control",
});

// Harvest.hasOne(FungiInforStage, {
//   foreignKey: "id",
//   as: "stage",
// });

FungiInfor.hasMany(Disease, {
  foreignKey: "fungiId",
  as: "diseases",
});

Disease.belongsTo(FungiInfor, {
  foreignKey: "fungiId",
  as: "disease",
});

Script.hasMany(Rule, {
  foreignKey: "scriptId",
  as: "rules",
});

// Rule.belongsTo(Script, {
//   foreignKey: "scriptId",
//   as: "rules",
// });

async function connect() {
  try {
    // await Database.authenticate();
    await FungiInfor.sync();
    await FungiInforStage.sync();
    await Data.sync();
    await Harvest.sync();
    await HarvestControlHistory.sync();
    await Rule.sync();
    await Disease.sync();
    await Script.sync();
    console.log("Sync database successfully!");
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}

module.exports = connect;
