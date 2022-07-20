import mongoose from "mongoose";

export const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled",
    minlength: 1,
    maxlength: 100,
  },
  content: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

pageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Page", pageSchema, "Pages");
