const { Schema, model } = require("mongoose");
const ROLE_ENUM = ["user", "admin"];
const userSchema = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowerCase: true,
      required: true,
      index: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ROLE_ENUM },
    profile: { type: String },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);
module.exports = { User: userModel };
