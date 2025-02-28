const News = require("../models/newsModel");

// Create News
exports.createNews = async (req, res) => {
    try {
        const { slugUrl } = req.body;
        const newsExists = await Category.findOne({ slugUrl });

        if (newsExists) {
            return res.status(400).json({ success: false, message: "news already exists" });
        }

        const news = await News.create(req.body);
        res.status(201).json({ success: true, message: "News created successfully", news });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update News
exports.updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        res.status(200).json({ success: true, message: "News updated successfully", news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete News
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        res.status(200).json({ success: true, message: "News deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get Single News by ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        res.status(200).json({ success: true, news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update News Status (Approve, Reject, Pending)
exports.updateNewsStatus = async (req, res) => {
    try {
        const { newsStatus } = req.body;
        const news = await News.findByIdAndUpdate(req.params.id, { newsStatus }, { new: true });

        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        res.status(200).json({ success: true, message: `News status updated to ${newsStatus}`, news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Toggle sliderShow
exports.toggleSliderShow = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        news.sliderShow = !news.sliderShow;
        await news.save();

        res.status(200).json({ success: true, message: `sliderShow set to ${news.sliderShow}`, news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Toggle breakingNews
exports.toggleBreakingNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ success: false, message: "News not found" });

        news.breakingNews = !news.breakingNews;
        await news.save();

        res.status(200).json({ success: true, message: `breakingNews set to ${news.breakingNews}`, news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
