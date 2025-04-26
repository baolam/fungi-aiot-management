const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const Harvest = Database.define("harvest", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  fungiId: {
    /// Loại nấm đang được trồng
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_stage: {
    /// Giai đoạn hiện tại
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_disease: {
    /// Bệnh hiện tại của cây trồng ở vụ
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Harvest;
