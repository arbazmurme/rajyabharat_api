const express = require("express");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    allCategories,
    slugUrlExist,
} = require("../controllers/categoryController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/all").get(allCategories);
router.route("/new").post(protectAdmin, createCategory);
router.route("/catupdate/:slug").put(protectAdmin, updateCategory).delete(protectAdmin, deleteCategory);
router.route("/catslugurl/:slug").get(slugUrlExist);

module.exports = router;
