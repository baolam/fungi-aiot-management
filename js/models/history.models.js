const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const HarvestControlHistory = Database.define("control_hisotry", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  harvest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  led_intensity: {
    /// Mức độ sáng
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  fan: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  water: {
    // Dùng để kiểm soát độ ẩm
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = {
  HarvestControlHistory,
};
