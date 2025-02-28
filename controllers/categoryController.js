const Category = require("../models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { nameInEnglish, nameInTelugu, slugUrl, priority, status } = req.body;

    const categoryExists = await Category.findOne({ slugUrl });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }
    const category = await Category.create({
      nameInEnglish,
      nameInTelugu,
      slugUrl,
      priority: priority || 0,
      status: status || false,
    });
    if (category) {
      res.status(201).json({ success: true, message: "Category created successfully", category });
    } else {
      res.status(400).json({ success: false, message: "Invalid category data" });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { nameInEnglish, nameInTelugu, slugUrl, priority, status } = req.body;
    const { slug } = req.params;
    // Find the category using slugUrl
    let category = await Category.findOne({ slugUrl: slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    // Ensure new slugUrl is unique if it's being updated
    if (slugUrl && slugUrl !== category.slugUrl) {
      const existingCategory = await Category.findOne({ slugUrl });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: "Slug URL already exists" });
      }
    }
    // Update category using slugUrl
    category = await Category.findOneAndUpdate(
      { slugUrl: slug },
      { nameInEnglish, nameInTelugu, slugUrl, priority, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Category updated successfully", category });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { slug } = req.params;
    let category = await Category.findOne({ slugUrl: slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
    await Category.findOneAndDelete({ slugUrl: slug })
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error,
    });
  }
});

exports.slugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slugUrl: slug }).select("slugUrl").lean();
    if (category) {
      res.status(200).json({ success: true, category });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});