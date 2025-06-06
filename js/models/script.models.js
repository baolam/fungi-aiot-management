const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const Script = Database.define("script", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fungiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diseaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Script;
