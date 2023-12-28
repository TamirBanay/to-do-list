const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// POST request to add a new todo
router.post("/add", todoController.addTodo);
router.get("/getTodoOfUser/:userId", todoController.getTodoListOfUser);
router.patch("/todoIsDone/:id", todoController.todoIsDone); // Changed todoId to id
router.delete("/deleteTodo/:todoId", todoController.deleteTodo);

module.exports = router;
