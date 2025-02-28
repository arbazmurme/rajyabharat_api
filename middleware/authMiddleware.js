const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

exports.protectAdmin = async (req, res, next) => {
  try {
    let token = req.cookies.token && req.header("Authorization")

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied, no token provided" });
    }

    // If the token is in Bearer format, extract it
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin by decoded ID
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(403).json({ success: false, message: "Not authorized as admin" });
    }

    req.admin = admin; // Store admin info in req
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
