// database.js
const { Sequelize } = require("sequelize");

// Replace with your database credentials and configuration
const sequelize = new Sequelize("todolist", "root", "tamirsapir055", {
  host: "localhost",
  dialect: "mysql", // or another supported database
});

module.exports = sequelize;
