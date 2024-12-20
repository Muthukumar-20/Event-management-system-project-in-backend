import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  generalprice: {
    type: Number,
    required: true,
  },
  vipprice: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Post = mongoose.model("Post", postSchema);

export default Post;
