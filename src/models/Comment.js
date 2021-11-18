import mongoose from "mongoose";
import User from "./User.js";
const { schema } = mongoose;

const commentSchema = new mongoose.Schema(
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
    commentContent: {
      type: String,
      required: false,
      unique: false,
    },
    createDate: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { versionKey: false }
);

const Comment = mongoose.model("Comment", commentSchema);

export { Comment, commentSchema };
