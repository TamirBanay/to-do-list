const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// POST request to register a new user
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
