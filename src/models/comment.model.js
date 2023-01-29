const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const commentSchema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    post: { type: ObjectId, ref: "Post", required: true, index: true },
    commentedBy: { type: ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

const commentModel = model("Comment", commentSchema);
module.exports = { Comment: commentModel };
