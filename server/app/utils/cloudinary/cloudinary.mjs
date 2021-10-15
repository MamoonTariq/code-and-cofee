import Cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: process.env.CloudinaryName,
  api_key: process.env.CloudinaryApiKey,
  api_secret: process.env.CloudinaryApiSecret,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'selfDevelopment',
    //public_id: (req, file) => `{Date.now()}`,
  },
});

export default cloudinaryStorage;
