const express = require("express");
const { gitAllDistrict } = require("../controllers/districtsController");

const router = express.Router();
router.route("/gitAllDistrict").get(gitAllDistrict);

module.exports = router;
