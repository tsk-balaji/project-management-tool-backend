const Project = require("../models/Project");

// Create a new project
exports.createProject = async (req, res) => {
  const { name, description, startDate, endDate, assignedUsers } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      assignedUsers,
    });
    res.status(201).json({ message: "Project created successfully", project });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating project", error: err.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "assignedUsers",
      "name email"
    );
    res.status(200).json({ projects });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating project", error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: err.message });
  }
};
