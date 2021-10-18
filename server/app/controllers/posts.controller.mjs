import { PostsModal } from '../modals/index.modals.mjs';
import { cloudinary } from '../utils/cloudinary/cloudinary.mjs';

const Create = (req, res) => {
  const { title = '', userId = '', content = '' } = req.body;
  if (!title) return res.json({ error: 'title required', status: 500 });
  if (!userId) return res.json({ error: 'user Id required', status: 500 });

  const images = req.files;
  if (!images.length)
    return res.json({ error: 'featured image is required', status: 500 });
  let filterFeaturedImage = images.filter(
    (img) => img.fieldname === 'featuredImage'
  );
  if (!filterFeaturedImage.length)
    return res.json({ error: 'featured image required', status: 500 });

  let featuredImageObj = {
    url: filterFeaturedImage[0].url,
    name: filterFeaturedImage[0].name,
  };
  console.log(featuredImageObj);
  PostsModal.create({
    userId: userId,
    title: title,
    content: content,
    featuredImage: featuredImageObj,
  });
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
