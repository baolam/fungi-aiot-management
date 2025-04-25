const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const Rule = Database.define("rule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  scriptId: {
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
  input_rule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output_rule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Rule;
