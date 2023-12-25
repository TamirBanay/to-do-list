const { Sequelize } = require("sequelize");

// Replace with your own database credentials
const sequelize = new Sequelize("todolist", "root", "tamirsapir055", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
