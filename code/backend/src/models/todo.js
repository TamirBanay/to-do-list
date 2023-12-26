// todo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserIdTable: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Users", 
        key: "id", 
      },
    },
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
    timestamps: true,
  }
);

module.exports = Todo;
