const { DataTypes } = require("sequelize");
const Database = require("../config/database.config");

const Script = Database.define("script", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Script;
