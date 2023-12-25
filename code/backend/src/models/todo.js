const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your database config file

const Todo = sequelize.define(
  "Todo",
  {
    // Attributes
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Model options
    timestamps: true, // Sequelize automatically adds createdAt and updatedAt fields
  }
);
const User = require("./user");

Todo.belongsTo(User); // This will add a userId field to the Todo model to track the owner of the todo
User.hasMany(Todo); // Optional: Use it if you need to fetch user with their todos

module.exports = Todo;
