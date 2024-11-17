const express = require("express");
const {
  createIssue,
  getIssuesByProject,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Create an issue
router.post("/", protect, createIssue);

// Get issues by project
router.get("/:projectId", protect, getIssuesByProject);

// Update an issue
router.put("/:id", protect, updateIssue);

// Delete an issue
router.delete("/:id", protect, deleteIssue);

module.exports = router;
