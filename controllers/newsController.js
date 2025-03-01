const News = require("../models/newsModel");

exports.newsCreate = async (req, res) => {
    try {
        const { newsTitleInTelugu, newsTitleInEnglish, slugUrl } = req.body;

        // Validate required fields
        if (!newsTitleInTelugu || !newsTitleInEnglish || !slugUrl) {
            return res.status(400).json({ success: false, message: "Please enter all required fields" });
        }

        // Check if news already exists
        const newsExists = await News.findOne({ slugUrl });
        if (newsExists) {
            return res.status(400).json({ success: false, message: "News with this slug already exists" });
        }

        // Create news entry
        const news = await News.create(req.body);

        res.status(201).json({
            success: true,
            message: "News created successfully",
            news,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

exports.newsUpdate = async (req, res) => {
    try {
        const slug = req.params.slug;

        // Check if the news exists
        let news = await News.findOne({ slugUrl :slug })
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found" });
        }   

        // Update the news entry
        news = await News.findOneAndUpdate({ slugUrl :slug }, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "News updated successfully",
            news,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

exports.newsDelete = async (req, res) => {
    try {
        // Check if the news exists
        const news = await News.findOne({ slugUrl: req.params.slug });
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found" });
        }

        // Delete the news entry
        await News.deleteOne({ slugUrl: req.params.slug });
        res.status(200).json({
            success: true,
            message: "News deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};