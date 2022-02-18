import mongoose from "mongoose";
import { pageSchema } from "./Page.js";

const userSchema = new mongoose.Schema({
  name: String,
  picture: String,
  auth_time: Number,
  user_id: String,
  email: String,
  uid: String,
  pages: [pageSchema],
});

export default mongoose.model("User", userSchema, "Users");
