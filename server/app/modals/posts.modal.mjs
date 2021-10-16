import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    featuredImage: {
      type: Object,
    },
    images: {
      type: [],
    },
  },
  { timestamps: true }
);
const PostsModal = mongoose.model('post', PostSchema);

export default PostsModal;
