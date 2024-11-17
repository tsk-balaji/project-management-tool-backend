const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  name: { type: String },
  description: { type: String },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: String }],
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Project", projectSchema, "pmt_Project");
