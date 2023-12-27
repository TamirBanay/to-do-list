const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ id: newUser.id, name: newUser.name, email: newUser.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed: User not found." });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed: Incorrect password." });
    }

    // User matched, create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Sign token (expires in 1 hour for example)
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Success",
      token: "Bearer " + token,
      payload: payload,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
