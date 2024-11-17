const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  deadline: { type: Date, required: true },
  teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: String }],
});

module.exports = mongoose.model("Project", ProjectSchema, "pmt_Project");
