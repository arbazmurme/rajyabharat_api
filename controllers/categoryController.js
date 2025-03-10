const Category = require("../models/categoryModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { nameInEnglish, nameInTelugu, slugUrl } = req.body;

    if (!nameInEnglish || !nameInTelugu || !slugUrl) {
      return res.status(400).json({ success: false, message: "Please enter all required fields" });
    }

    if (await Category.findOne({ slugUrl })) {
      return res.status(400).json({ success: false, message: "Name in English already exists" });
    }
    
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).json({ success: false, message: "Invalid category data" });
    }
    res.status(201).json({ success: true, message: "Category created successfully", category });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
});

exports.allCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { nameInEnglish, nameInTelugu} = req.body;
    const { slug } = req.params;

    if (!nameInEnglish || !nameInTelugu) {
      return res.status(400).json({ success: false, message: "Please enter all required fields" });
    }
    
    // Find the category using slugUrl
    let category = await Category.findOne({ slugUrl: slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Check if slugUrl already exists
    if (await Category.findOne({ slugUrl: req.body.slugUrl })) {
      return res.status(400).json({ success: false, message: "Slug URL already exists" });
    }

    // Update category using slugUrl
    category = await Category.findOneAndUpdate(
      { slugUrl: slug },
      req.body,
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
      id: category._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error: error,
    });
  }
});

exports.setStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const { status } = req.body;  
    const { slug } = req.params;

    // Find the category using slugUrl
    let category = await Category.findOne({ slugUrl: slug });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found in database" });
    }

    // Update category using slugUrl
    category = await Category.findOneAndUpdate(
      { slugUrl: slug },
      { status: status },
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
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
});