const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user-model");
const uuid = require("uuid");

// User Registration
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If the user and password are valid, you can implement your logic to generate and send a JWT token for authentication.

    // For demonstration purposes, we're just sending a success message.
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// Password Reset (You can implement your password reset logic here)

module.exports = {
  register,
  login,
};
