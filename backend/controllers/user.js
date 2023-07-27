const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

router.post("/userdetails", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Error while fetching user details:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1 });
    const userEmails = users.map((user) => user.email);
    res.json(userEmails);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/api/add-friend", async (req, res) => {
  const { friendEmail } = req.body;
  if (!friendEmail) {
    return res.status(400).json({ error: "Friend email is required" });
  }

  try {
    // Find the user and the friend by their email
    const user = await User.findOne({ email: "johndoe@example.com" }); // Replace with the current user's email
    const friend = await User.findOne({ email: friendEmail });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    // Add the friend to the current user's friends list
    user.friends.push({
      firstname: friend.firstname,
      lastname: friend.lastname,
      email: friend.email,
      id: friend._id,
    });

    // Add the current user to the friend's friends list
    friend.friends.push({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });

    await user.save();
    await friend.save();

    res.json({ user, friend }); // Return both users as a response
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
