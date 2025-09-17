const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// Registration endpoint
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      email,
      emailOtp,
      mobile,
      mobileOtp,
      password,
      confirmPassword
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = new User({
      firstName,
      lastName,
      dob,
      email,
      emailOtp,
      mobile,
      mobileOtp,
      password,
      registrationId: uuidv4()
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registrationId: user.registrationId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user", error: error.message });
  }
});

module.exports = router;
