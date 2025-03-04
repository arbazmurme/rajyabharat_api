const express = require("express");
const {
  newsCreate,
  newsUpdate,
  newsDelete,
  UploadImage,
  getFindByNewsurl,
  SlugUrlExist,
} = require("../controllers/newsController");
const { protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/new").post(protectAdmin, newsCreate);
router.route("/newsupdate/:slug").put(protectAdmin, newsUpdate);
router.route("/newsdelete/:slug").delete(protectAdmin, newsDelete);
router.route("/newsslugurl/:slugurl").get(SlugUrlExist);
router.route("/newsimage").post(UploadImage);
router.route("/findbyurl/:url").get(getFindByNewsurl);

module.exports = router;
