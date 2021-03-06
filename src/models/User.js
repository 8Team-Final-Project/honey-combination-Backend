import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userNickname: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: false,
      unique: false,
    },
    myPost: [
      {
        postId: { type: String },
        createDate: { type: String },
        postTitle: { type: String },
        postImg: {},
        postTag: {},
        likeCount: { type: Number, default: 0 },
        postCount: { type: Number, default: 0 },
        likeState: { type: Boolean, default: false },
        keepPoststate: { type: Boolean, default: false },
      },
    ],
    keepPost: [{ postId: { type: String } }],
    keepPostList: [],
    likePost: [{ _id: { type: String } }],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
