const User = require("../models/user"); // Assuming your User model file is named "user.js"

const getUserById = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the userId as a request parameter

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || !users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Users found" });
    }
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
};
