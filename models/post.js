const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  postContent: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Post", Post);
