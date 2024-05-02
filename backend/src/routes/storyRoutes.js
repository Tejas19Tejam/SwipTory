const express = require("express");
const storyController = require("../controller/storyController.js");
const authController = require("../controller/authController.js");
const bookmarkRoutes = require("../routes/bookmarkRoutes");

const router = express.Router();

// Public routes (accessible without authentication)
router.route("/").get(authController.isLoggedIn, storyController.getAllStories);

// router.route("/:id").get(authController.isLoggedIn, storyController.getStory);

// Protected routes (require authentication)
router.use(authController.checkLogin);

router.use("/:id/bookmark", bookmarkRoutes);

router.route("/").post(storyController.createStory);

router.route("/:id").patch(storyController.updateStory);

router.route("/:id/like").post(storyController.updateLike);

module.exports = router;
