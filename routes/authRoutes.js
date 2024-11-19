const express = require("express");

const {
  registerUser,
  loginUser,
  activateAccount,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserDetails,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/activate/:token", activateAccount);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/users", getAllUsers);
router.get("/user", getUserDetails);

module.exports = router;
