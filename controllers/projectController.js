const Project = require("../models/Project");

//Create new project
exports.createProject = async (req, res) => {
  const { title, description, deadline, assignedUsers } = req.body;

  // Validation: Check required fields
  if (!title || !deadline) {
    return res.status(400).json({
      message: "Validation error",
      error: "Both `title` and `deadline` are required fields.",
    });
  }

  try {
    // Create the project
    const project = await Project.create({
      title,
      description,
      deadline,
      assignedUsers,
    });

    // Success response
    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    // Distinguish validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: err.message,
      });
    }

    // Handle other errors
    res.status(500).json({
      message: "Error creating project",
      error: err.message,
    });
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

//Get a specfic project
exports.getSpecificProjects = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate and fetch the project
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the project", error });
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
