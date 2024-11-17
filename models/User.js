const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "TeamLeader", "Member"],
    default: "Member",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema, "pmt_Users");
