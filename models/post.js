const mongoose = require("mongoose");
const { Schema } = mongoose;

const Like = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
});

const Post = new mongoose.Schema({
  postContent: String,

  likeUser: [Like],
});

module.exports = mongoose.model("Post", Post);
module.exports = mongoose.model("Like", Like);
// module.exports = mongoose.model("Hate", Hate);
// module.exports = mongoose.model("KeepPost", KeepPost);
