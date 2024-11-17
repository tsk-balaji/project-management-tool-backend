const Issue = require("../models/Issue");

// Create a new issue
exports.createIssue = async (req, res) => {
  const { title, description, projectId, assignedTo, status, priority } =
    req.body;
  try {
    const issue = await Issue.create({
      title,
      description,
      projectId,
      assignedTo,
      status,
      priority,
    });
    res.status(201).json({ message: "Issue created successfully", issue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating issue", error: err.message });
  }
};

// Get issues by project
exports.getIssuesByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const issues = await Issue.find({ projectId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json({ issues });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching issues", error: err.message });
  }
};

// Update an issue
exports.updateIssue = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const issue = await Issue.findByIdAndUpdate(id, updates, { new: true });
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json({ message: "Issue updated successfully", issue });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating issue", error: err.message });
  }
};

// Delete an issue
exports.deleteIssue = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting issue", error: err.message });
  }
};

// Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("assignedTo", "name email");
    res.status(200).json({ issues });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching issues", error: err.message });
  }
};