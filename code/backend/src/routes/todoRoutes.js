const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// POST request to add a new todo
router.post('/add', todoController.addTodo);

module.exports = router;
