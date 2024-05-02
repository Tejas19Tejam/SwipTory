const express = require("express");
const authController = require("../controller/authController");
const bookmarkRoutes = require("../routes/bookmarkRoutes");

const router = express.Router();

// CREATING ROUTES FOR AUTHENTICATION
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.get("/logout", authController.logout);
router.get("/verify", authController.verifyToken);

// REQUIRED AUTHENTICATION
router.use(authController.checkLogin);

router.use("/bookmarks", bookmarkRoutes);

module.exports = router;
