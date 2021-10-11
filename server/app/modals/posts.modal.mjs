import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = Schema(
  {
    user_id: {
      typpe: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    Images_URl: {
      type: [],
    },
  },
  { timestamps: true }
);
const PostsModal = mongoose.model("post", PostSchema);

export default PostsModal;
