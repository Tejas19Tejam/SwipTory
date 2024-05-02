const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./src/controller/errorController");
const AppError = require("./src/utils/appError");
const storyRoutes = require("./src/routes/storyRoutes");
const userRoutes = require("./src/routes/userRoutes");
const path = require("path");
var cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.options(cors());

// Allow traffic from Reverse Proxy Server
app.enable("trust-proxy");
app.use(cookieParser());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Body parser , reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Development logging
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/stories", storyRoutes);
// app.use("/api/v1/bookmarks", storyRoutes);

// This middleware will run for all the HTTP request (ie GET , POST  , PATCH etc )
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
