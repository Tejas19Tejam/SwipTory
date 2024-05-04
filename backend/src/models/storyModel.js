const mongoose = require("mongoose");

// Define the Story schema
const storySchema = new mongoose.Schema(
  {
    slides: {
      type: [
        {
          image: {
            type: String,
            required: true,
            default: "default-image.jpg",
          },
          heading: {
            type: String,
            required: true,
            trim: true,
            maxLength: [30, "The title must be less or equal to 10 characters"],
            minLength: [0, "The title must be more or equal to 10 characters"],
          },
          description: {
            type: String,
            required: true,
            trim: true,
            maxLength: [40, "The title must be less or equal to 40 characters"],
            minLength: [1, "The title must be more or equal to 40 characters"],
          },
        },
      ],
      validate: [
        {
          validator: (slides) => slides.length >= 3,
          msg: "Minimum 3 slides required",
        },
        {
          validator: (slides) => slides.length <= 6,
          msg: "Maximum 6 slides allowed",
        },
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ["food", "health and fitness", "travel", "movie", "education"],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  }
);

// Create the Story model
const Story = mongoose.model("Story", storySchema);
module.exports = Story;
