const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// @route   POST /api/users/register
// @desc    Register a new user
router.post("/register", userController.registerUser);

// @route   POST /api/users/login
// @desc    Login user
router.post("/login", userController.loginUser);

// @route   GET /api/users
// @desc    Get all users (admin only ideally)
// ⚠️ Later you can add middleware to restrict this to admins
router.get("/", userController.getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
router.get("/:id", userController.getUserById);

// @route   PUT /api/users/:id
// @desc    Update user by ID
router.put("/:id", userController.updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
