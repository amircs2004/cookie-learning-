const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true // Ensures no two users share the same ID
  },
  visits: {
    type: Number,
    default: 1 // Start at 1 for a new user
  },
  lastVisited: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);