const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
});

// Create the Story model
const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
