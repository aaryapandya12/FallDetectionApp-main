// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  personalDetails: {
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    emergencyContact1: String,
    emergencyContact2: String,
  },
});

module.exports = mongoose.model('User', userSchema);