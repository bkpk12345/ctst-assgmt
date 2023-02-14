const { Schema, model, Types } = require("mongoose");
const { ObjectId } = Types;

const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    author: { type: ObjectId, ref: "User", required: true, index: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const todoModel = model("Todo", todoSchema);
module.exports = { Todo: todoModel };
