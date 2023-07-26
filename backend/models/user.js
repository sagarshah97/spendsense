const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Friend Schema (Embedded within the User Schema)
const FriendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  friends: [FriendSchema], // Embedding the FriendSchema as an array of friends
});

module.exports = mongoose.model("User", UserSchema);
