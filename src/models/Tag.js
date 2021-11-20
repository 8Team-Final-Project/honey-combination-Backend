import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: String,
      required: false,
      unique: false,
    },
    tagCount: {
      type: Number,
      required: false,
      unique: false,
    },
  },
  { versionKey: false }
);

const Tag = mongoose.model("Tag", tagSchema);

export { Tag, tagSchema };
