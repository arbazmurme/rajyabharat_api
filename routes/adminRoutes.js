const express = require("express");
const { createAdmin, loginAdmin, logoutAdmin } = require("../controllers/adminController");

const router = express.Router();
router.route("/register").post(createAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").get(logoutAdmin);

module.exports = router;