// databaseInit.js
const { Sequelize } = require("sequelize"); // Ensure Sequelize is installed

// Import the Sequelize configuration instance
// Adjust the path to point to where your database configuration file is located.
// This file should export an instance of a Sequelize connection.
const sequelize = require("./database");

// Import your models
// Adjust the paths to point to where your model files are located.
const User = require("../models/user");
const Todo = require("../models/todo");

const initializeDatabase = async () => {
  try {
    // Define associations here
    // This associates the Todo model with the User model.
    Todo.belongsTo(User, { foreignKey: "userId" });
    User.hasMany(Todo, { foreignKey: "userId" });

    // Test the connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Synchronize all models with the database
    // Be cautious with the { force: true } and { alter: true } options in production
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (error) {
    // Log any errors
    console.error("Failed to synchronize database:", error);
  }
};

// Export the function for external use if needed
module.exports = initializeDatabase;

// Call the function to initialize the database
initializeDatabase();
