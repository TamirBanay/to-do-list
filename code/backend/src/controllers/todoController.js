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

exports.getTodoListOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todos = await Todo.findAll({
      where: { UserIdTable: userId },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.todoIsDone = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the completed status
    todo.completed = !todo.completed;

    // Save the changes
    await todo.save();

    res.json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.todoId;
    const deleted = await Todo.destroy({
      where: { id: id },
    });

    if (deleted) {
      return res.status(200).send("Todo deleted");
    }
    throw new Error("Todo not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
