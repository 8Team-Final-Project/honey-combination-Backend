import mongoose from "mongoose";

const { Schema } = mongoose;

const eventlikeSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
});

const eventSchema = new mongoose.Schema(
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
    postTag: {
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
    likeUser: [eventlikeSchema],
    postTag: [String],
    likeCnt: {
      type: Number,
    },
  },
  { versionKey: false }
);

const Event = mongoose.model("Event", eventSchema);
const EventLike = mongoose.model("EventLike", eventlikeSchema);

export { Event, EventLike };
