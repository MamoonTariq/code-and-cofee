import { PostsModal } from '../modals/index.modals.mjs';
import { cloudinary } from '../utils/cloudinary/cloudinary.mjs';

const Create = (req, res) => {
  console.log(req.files);
  res.json({
    message: 'posts created successfully',
    status: 200,
  });
};

const Delete = async (req, res) => {
  try {
    // await cloud.uploader.destroy(`'${req.params.id}'`);
    let result = await cloudinary.uploader.destroy(
      `selfDevelopment/${req.params.id}`
    );
    res.send(result);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { Create, Delete };
