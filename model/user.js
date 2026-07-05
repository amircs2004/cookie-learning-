const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes accidental whitespace
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    default: 1, // Start at 1 for a new user
  },
  lastVisited: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
