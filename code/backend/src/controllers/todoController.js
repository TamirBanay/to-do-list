// Assuming this is part of a controller file
const Todo = require("../models/todo");
const User = require("../models/user");

exports.addTodo = async (req, res) => {
  try {
    const { title, description, UserId } = req.body; // Ensure this matches the JSON key sent from the client

    // Find the user by primary key (id)
    const user = await User.findByPk(UserId); // Change 'id' to 'UserId'
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new todo linked to the user
    const newTodo = await Todo.create({
      title,
      description,
      completed: false, // Default value
      UserIdTable: UserId, // Ensure this matches the column name in your Todo model
    });

    // Return the new todo
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
