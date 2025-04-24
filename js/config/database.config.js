const sequelize = require("sequelize");

const database_path = process.env.DATABASE_NAME;
console.log("Database path: ", database_path);

const Database = new sequelize.Sequelize({
  dialect: "sqlite",
  storage: database_path,
  logging: false,
});

module.exports = Database;
