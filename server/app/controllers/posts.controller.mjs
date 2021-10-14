import { PostsModal } from '../modals/index.modals.mjs';

const Create = (req, res) => {
  console.log(req.files);
  res.json({
    message: 'posts created successfully',
    status: 200,
  });
};

export { Create };
