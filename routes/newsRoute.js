const express = require("express");
const {
  newsCreate,
  newsUpdate,
  newsDelete,
} = require("../controllers/newsController");
const { protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/new").post(protectAdmin, newsCreate);
router.route("/newsupdate/:slug").put(protectAdmin, newsUpdate);
router.route("/newsdelete/:slug").delete(protectAdmin, newsDelete);

module.exports = router;
