const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  newsTitleInTelugu: {
    type: String,
    required: [true, "Please enter newsTitle name"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  newsTitleInEnglish: {
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
  district: { type: String },
  metaKeywords: {
    type: [String],
  },

  slider: {
    type: [String],
  },

  thumbnail: {
    type: String,
  },

  icon: {
    type: String,
  },

  reporterId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "reporterId Require"],
    ref: "Reporter",
  },

  reporterName: {
    type: String,
    required: [true, "Please enter  name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide mobile"],
    trim: true,
  },

  mobile: {
    type: String,
    trim: true,
  },

  sliderShow: {
    type: Boolean,
    default: false,
  },

  breakingNewsShow: {
    type: Boolean,
    default: false,
  },

  newsAprovelText: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  numberofViews: {
    type: Number,
    default: 0,
  },
  reporterImage: {
    type: String,
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
      avatar: {
        type: String,
        default:
          "https://res.cloudinary.com/dh1fsseho/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669977353/Avatar/avatar2_z6yynb.jpg",
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", newsSchema);
