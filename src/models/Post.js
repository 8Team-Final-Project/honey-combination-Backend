import mongoose from "mongoose";

const { Schema } = mongoose;

const likeSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
});

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: false,
      unique: false,
    },
    userId: {
      type: String,
      required: false,
      unique: false,
    },
    userNickname: {
      type: String,
      required: false,
      unique: false,
    },
    postTitle: {
      type: String,
      required: false,
      unique: false,
    },
    postContent: {
      type: String,
      required: false,
      unique: false,
    },
    postImg: {
      type: String,
      required: false,
      unique: false,
    },
    myPost: {
      type: Boolean,
      required: false,
      unique: false,
    },
    likeState: {
      type: Boolean,
      required: false,
      unique: false,
    },
    keepPoststate: {
      type: Boolean,
      required: false,
      unique: false,
    },
    postState: {
      type: Boolean,
      required: false,
      unique: false,
    },
    createDate: {
      type: String,
      required: false,
      unique: false,
    },
    likeUser: [likeSchema],
    postTag: [String],
    likeCnt: {
      type: Number,
    },
  },
  { versionKey: false }
);

postSchema.set('toJSON', {
  virtuals: true,
});

const Post = mongoose.model("Post", postSchema);
const Like = mongoose.model("Like", likeSchema);

export { Post, Like };
