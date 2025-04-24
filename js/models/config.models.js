const Database = require("../config/database.config");
const { FungiInfor, FungiInforStage } = require("./fungi.infor.models");
const { HarvestControlHistory } = require("./history.models");
const Harvest = require("./harvest.models");
const Data = require("./data.models");
const Rule = require("./rule.models");

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

async function connect() {
  try {
    // await Database.authenticate();
    await FungiInfor.sync();
    await FungiInforStage.sync();
    await Data.sync();
    await Harvest.sync();
    await HarvestControlHistory.sync();
    await Rule.sync();
    console.log("Sync database successfully!");
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}

module.exports = connect;
