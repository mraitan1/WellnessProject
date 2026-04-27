const express = require("express");
const router = express.Router();
const User = require("../models/User");

//sigup
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;