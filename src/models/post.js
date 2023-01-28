const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    author: { type: ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

const postModel = model("Post", postSchema);
module.exports = { Post: postModel };
