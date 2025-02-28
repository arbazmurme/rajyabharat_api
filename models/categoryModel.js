const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {    
    nameInTelugu: {
      type: String,
      required: [true, "Please enter category name in Telugu"],
      unique: true,
      trim: true,
    },
    
    nameInEnglish: {
      type: String,
      required: [true, "Please enter category name in English"],
      unique: true,
      trim: true,
    },
    slugUrl: {
      type: String,
      required: [true, "Please provide slug URL"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    priority: {
      type: Number,
      default: 0,
      min: 0, // Ensures priority is non-negative
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Create Index for better query performance
CategorySchema.index({ nameInEnglish: 1, nameInTelugu: 1, slugUrl: 1 });

module.exports = mongoose.model("Category", CategorySchema);
