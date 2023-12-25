const sequelize = require("./database"); 
const User = require("../models/user"); 
const Todo = require("../models/todo"); 

const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = initializeDatabase;
