const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your database config file

const User = sequelize.define(
  "User",
  {
    // Attributes
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Model options
    timestamps: true,
  }
);

module.exports = User;
