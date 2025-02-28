const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  newsTitleInEnglish: {
    type: String,
    required: [true, "Please enter newsTitle name"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  newsTitleInTelugu: {
    type: String,
    required: [true, "Please enter newsTitle name"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  newsContentInEnglish: {
    type: String,
    required: [true, "Please enter  newsContent"],
  },
  newsContentInTelugu: {
    type: String,
    required: [true, "Please enter  newsContent"],
  },

  category: {
    type: String,
    required: [true, "Please enter Category Name name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },

  sliderShow: {
    type: Boolean,
    default: false,
  },
  breakingNews: {
    type: Boolean,
    default: false,
  },

  newsStatus: {
    type: String,
    enum: ['Aprove', "Pending", "Reject"],
    default: "Pending",
  },
  numberofViews: {
    type: Number,
    default: 0,
  },

  review: [
    {
      userName: {
        type: String,
      },
      userEmail: {
        type: String,
      },
      newsComment: {
        type: String,
      },
      newsLike: {
        type: Number,
        default: 0,
      },
      newsDislike: {
        type: Number,
        default: 0,
      },
      avatar: {
        type: String,
        default:
          "https://res.cloudinary.com/dxkufsejm/image/upload/v1626826824/avater/avater",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", newsSchema);
