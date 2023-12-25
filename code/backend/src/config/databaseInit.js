const sequelize = require("./database"); // Adjust the path to your database config
const User = require("../models/user"); // Adjust the path to your User model
const Todo = require("../models/todo"); // Adjust the path to your User model

// Sync all models at once
const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = initializeDatabase;
