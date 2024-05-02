const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

// Get token
const getToken = (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    return token;
  } else if (req.headers.cookie && req.headers.cookie.startsWith("jwt")) {
    token = req.headers.cookie.split("=")[1];
    return token;
  }
  return token;
};

// SignToken
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_SESSION_EXPIRES_IN,
  });
};

const createTokenAndSend = function (user, statusCode, req, res) {
  const token = signToken(user.id);

  // If we are in production , then cookies will be send vie HTTPS connections
  // Sending Cookie

  res.cookie("jwt", token, {
    // Cookies will expire in specified milliseconds
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.header("x-forwarded-proto") === "https",
    secure: false,
  });

  res.setHeader("Authorization", `Bearer ${token}`);

  // Remove the password and active status from the output
  user.password = undefined;

  // Create a new object with only the required fields
  const responseData = {
    id: user.id,
    username: user.username,
    photo: user.photo,
  };

  return res.status(statusCode).json({
    status: "success",
    data: {
      user: { ...responseData, role: "authenticated" },
      session: { access_token: `Bearer ${token}` },
    },
  });
};

// Registering user and sending the token for instant login to application
exports.signup = catchAsync(async (req, res, next) => {
  // Create a new user if no existing user found
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  // Check if newUser is successfully created
  if (!newUser) {
    return next(new AppError("Failed to create user account.", 500));
  }

  // Generating Token
  createTokenAndSend(newUser, 201, req, res);
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  // Reading username , and password
  const { username, password } = req.body;

  // 1) Check if username and password is exist
  if (!username || !password) {
    return next(new AppError("Please provide the username and password ", 400));
  }
  // 2) Check if username and password  correct
  // console.log(req.body.username);
  const user = await User.findOne(
    { username },
    { password: 1, username: 1, photo: 1 }
  );

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password  ", 401));
  }

  // 3) If everything is ok , then send the JSON web token to user
  createTokenAndSend(user, 200, req, res);
});

// LoginChecker
exports.checkLogin = catchAsync(async (req, res, next) => {
  // 1) Getting token and checking of if its there

  const token = getToken(req);
  if (!token || token === "null") {
    return next(
      new AppError("You are not logged in ! Please login to get access.", 401)
    );
  }
  // 2) Verification of token
  // Promisify to avoid unexpected results
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETE_KEY
  );
  // 3) Check if user still exist or check token is expire or not

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exist !",
        401
      )
    );
  }

  // GRANT ACCESS TO THE PROTECTED ROUTES
  req.user = freshUser;
  // res.locals.user = freshUser;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const token = getToken(req);
  if (!token || token === "null") return next();

  // 1) Verify Token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETE_KEY
  );
  // 2) Check if user still exist or check token is expire or not
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError("User no longer exist for this account", 404));
  }

  req.user = freshUser;

  next();
});

// Logout
exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Remove Authorization header
  delete req.headers["authorization"];

  res.status(200).json({
    data: {
      status: "success",
    },
  });
};

// Middleware to verify token
exports.verifyToken = catchAsync(async (req, res, next) => {
  const token = getToken(req);

  if (token) {
    // Verify Token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRETE_KEY
    );

    // Check if user still exists or check if the token is expired
    const freshUser = await User.findById(decoded.id);

    if (freshUser) {
      // Create a new object with only the required fields
      const responseData = {
        id: freshUser.id,
        username: freshUser.username,
        photo: freshUser.photo,
      };

      // Send the response with authenticated user data
      return res.status(200).json({
        status: "success",
        data: {
          user: { ...responseData, role: "authenticated" },
          session: { access_token: `Bearer ${token}` },
        },
      });
    }
  }

  // Send the response with isAuthenticated flag set to false
  return res.status(200).json({
    status: "success",
    data: {
      user: {},
      session: null,
    },
  });
});
