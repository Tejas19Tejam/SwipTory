const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isUppercase } = require("validator");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
      trim: true,
      unique: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      trim: true,
      select: false,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    // To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Encrypt password before saving to database
// This middleware will run if only password field is modified
userSchema.pre("save", async function (next) {
  // this ===> Current document
  // If password field is not modified , then exit the function and call the next middleware function
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

/** This middleware will populate the given field   */
// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "bookmarks",
//     select: "-__v  -slides -author ",
//   });
//   next();
// });

// Instance method
userSchema.methods.checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
