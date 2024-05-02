const Story = require("../models/storyModel");
const Like = require("../models/likeModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllStories = catchAsync(async (req, res, next) => {
  let stories;

  // Get all stories
  if (req.query.category) {
    stories = await Story.find({ category: req.query.category }).sort({
      createdAt: -1,
    });
  } else {
    stories = await Story.find().sort({ createdAt: -1 });
  }

  // If user is authenticated
  if (req.user?.id) {
    // Fetch likes of the currently logged-in user
    const userLikes = await Like.find({ user: req.user.id }, { story: 1 });

    // Fetch bookmarks of the currently logged-in user
    const { bookmarks } = await User.findById(req.user.id, { bookmarks: 1 });

    // Loop through stories to add isLiked, isBookmarked, and isEditable properties
    stories = stories.map((story) => {
      const isLiked = userLikes.some((like) => like.story.equals(story._id));
      const isBookmarked = bookmarks.includes(story._id.toString());
      const isEditable = req.user.id === story.author.toString();
      return { ...story._doc, isLiked, isBookmarked, isEditable };
    });
  }

  return res.status(200).json({
    status: "success",
    count: stories.length,
    data: {
      result: stories,
    },
  });
});

exports.updateLike = catchAsync(async (req, res, next) => {
  const storyId = req.params.id;
  const userId = req.user.id;

  const isLiked = await Like.findOne({ user: userId, story: storyId });

  if (isLiked) {
    // If the user has already liked the story, unlike it
    await Like.findOneAndDelete({ user: userId, story: storyId });
    // Decrease story count by one
    await Story.findByIdAndUpdate(storyId, { $inc: { likesCount: -1 } });

    // Send response
    res.status(200).json({
      status: "success",
      data: {
        result: false,
      },
    });
  } else {
    // If the user has not liked the story, like it
    const newLike = await Like.create({ user: userId, story: storyId });
    await newLike.save();
    // Increase story count by one
    await Story.findByIdAndUpdate(storyId, { $inc: { likesCount: 1 } });
    res.status(201).json({
      status: "success",
      data: {
        result: true,
      },
    });
  }
});

exports.createStory = factory.createOne(Story);
exports.updateStory = factory.updateOne(Story);
