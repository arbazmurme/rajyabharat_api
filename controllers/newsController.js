const { response } = require("../app");
const News = require("../models/newsModel");
const cloudinary = require("cloudinary");

exports.newsCreate = async (req, res) => {
  try {
    const { newsTitleInTelugu, newsTitleInEnglish, slugUrl } = req.body;

    // Validate required fields
    if (!newsTitleInTelugu || !newsTitleInEnglish || !slugUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all required fields" });
    }

    // Check if news already exists
    const newsExists = await News.findOne({ slugUrl });
    if (newsExists) {
      return res.status(400).json({
        success: false,
        message: "News with this slug already exists",
      });
    }

    // Create news entry
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.SlugUrlExist = async (req, res, next) => {
  try {
    let news = await News.findOne({ slugUrl: req.params.slugurl });

    if (!news) {
      return res.status(500).json({
        success: false,
        message: "new news SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " category SlugUrl already exist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.UploadImage = async (req, res, next) => {
  try {
    const slider = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Slider",
      crop: "scale",
    });
    const sliders = slider.secure_url;

    const thumbnail = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Thumbnail",
      width: 360,
      height: 239,
      crop: "scale",
    });
    const thumbnails = thumbnail.secure_url;

    const icon = await cloudinary.v2.uploader.upload(req.body.slider, {
      folder: "News/Icon",
      width: 100,
      height: 75,
      crop: "scale",
    });
    const icons = icon.secure_url;

    res.status(200).json({
      success: true,
      sliders,
      thumbnails,
      icons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.getDistrictNnews = async (req, res) => {
  try {
    const { district } = req.query;

    if (!district) {
      return res.status(400).json({ message: "District is required" });
    }

    const districtNews = await News.find({ district }).limit(5);
    res.json(districtNews);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      success: true,
      news: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}; // this makes the app slow

exports.getNewsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "categoryId is required" });
    }
    const news = await News.find({ categoryId: req.body.categoryId })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      news: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.getFindByNewsurl = async (req, res, next) => {
  try {
    console.log(req.params.url);
    let news = await News.find({ slugUrl: req.params.url });

    if (!news) {
      return res.status(500).json({
        success: false,
        message: "news not found",
      });
    }
    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.newsUpdate = async (req, res) => {
  try {
    const slug = req.params.slug;

    // Check if the news exists
    let news = await News.findOne({ slugUrl: slug });
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    console.log(req.body);

    // Update the news entry
    news = await News.findOneAndUpdate({ slugUrl: slug }, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.newsDelete = async (req, res) => {
  try {
    // Check if the news exists
    const news = await News.findOne({ slugUrl: req.params.slug });
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }

    // Delete the news entry
    await News.deleteOne({ slugUrl: req.params.slug });
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.updateNewsApproval = async (req, res) => {
  try {
    const { slugUrl, newsAprovelText } = req.body;
    if (!slugUrl || !newsAprovelText) {
      return res
        .status(400)
        .json({ message: "slugUrl and newsAprovelText are required" });
    }
    const news = await News.findOneAndUpdate(
      { slugUrl },
      { newsAprovelText },
      { new: true }
    );
    if (!news) {
      return res
        .status(404)
        .json({ message: "News not found with the provided slugUrl" });
    }
    res.status(200).json({
      message: "News approval status updated successfully",
      news,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateNewsWithDistricts = async () => {
  try {
    const newsData = await News.find();
    const districts = ["Amirpath", "Bagampeth", "S R Nagar", "Siddipet"];
    for (let news of newsData) {
      const assignedDistrict =
        districts[Math.floor(Math.random() * districts.length)];

      await News.updateOne(
        { _id: news._id },
        { $set: { mandal: assignedDistrict } }
      );
    }

    console.log("All news articles updated successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error updating news data:", error);
  }
};
