const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.get("/loginRoutes", authenticate, (req, res) => {
  res.json({ msg: "This is a protected route" });
});

module.exports = router;
