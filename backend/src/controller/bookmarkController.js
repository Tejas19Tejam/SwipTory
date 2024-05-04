const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllBookmarks = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const { bookmarks } = await User.findOne({ _id: userId })
    .select("bookmarks")
    .populate("bookmarks");

  return res.status(200).json({
    message: "success",
    count: bookmarks?.length,
    data: {
      result: bookmarks,
    },
  });
});

exports.updateBookmark = catchAsync(async (req, res, next) => {
  const storyId = req.params.id;

  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("There is no user for this account", 404));
  }

  // Check if the story is already bookmarked by the user

  const isBookmarked = user.bookmarks.includes(storyId);

  if (isBookmarked) {
    // If the story is already bookmarked, remove it from bookmarks
    user.bookmarks.pull(storyId);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: {
        bookmarked: false,
      },
    });
  } else {
    // If the story is not bookmarked, add it to bookmarks
    user.bookmarks.push(storyId);
    await user.save({ validateBeforeSave: false });

    res.status(201).json({
      status: "success",
      data: {
        bookmarked: true,
      },
    });
  }
});
