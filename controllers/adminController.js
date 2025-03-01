const Admin = require("../models/adminModel.js");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    const { adminName, email, password, mobile } = req.body;

    if (!adminName || !email || !password || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    // Check if the admin already exists
    const emailExists = await Admin.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email ID already exists",
      });
    }
    const mobileExists = await Admin.findOne({ mobile });
    if (mobileExists) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    // Create new admin
    const admin = await Admin.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter Email & Password" });
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token, // Send token in response
      admin: {
        id: admin._id,
        name: admin.adminName,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Admin logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

