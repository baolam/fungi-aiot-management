const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const Data = Database.define("data", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  harvest: {
    /// Trường dùng để kết nối đến vụ mùa
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  light: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = Data;
