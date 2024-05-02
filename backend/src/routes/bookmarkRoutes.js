const express = require("express");
const bookmarkController = require("../controller/bookmarkController");
const authController = require("../controller/authController");

// New router sub-application
const router = express.Router({ mergeParams: true });

// Protected route
router.use(authController.checkLogin);

router
  .route("/")
  .get(bookmarkController.getAllBookmarks)
  .post(bookmarkController.updateBookmark);

module.exports = router;
