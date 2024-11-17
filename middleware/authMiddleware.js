const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes: Authenticate user
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Role-based access control (Admin or Project Manager)
exports.isAdminOrPM = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "project_manager") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Not authorized, insufficient permissions" });
  }
};
