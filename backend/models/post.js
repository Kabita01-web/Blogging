import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  coverImage: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Post", PostSchema);
