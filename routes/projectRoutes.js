const express = require("express");
const {
  createProject,
  getProjects,
  updateProject,
  getSpecificProjects,
  deleteProject,
} = require("../controllers/projectController");
const { protect, isAdminOrPM } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a project (Admin or Project Manager)
router.post("/", protect, isAdminOrPM, createProject);

// Get all projects
router.get("/", protect, getProjects);

// Update a project (Admin or Project Manager)
router.put("/:id", protect, isAdminOrPM, updateProject);

//Get a Specific Project.
router.get("/:id", getSpecificProjects);

// Delete a project (Admin)
router.delete("/:id", protect, isAdminOrPM, deleteProject);

module.exports = router;
