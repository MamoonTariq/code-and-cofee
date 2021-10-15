import { Router } from 'express';

import UserAuthantication from '../middlewares/authantication.middleware.mjs';
import { PostsController } from '../controllers/index.controllers.mjs';
import PostImageMulter from '../utils/multer/index.multer.mjs';

import cloudinary from 'cloudinary';

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CloudinaryName,
  api_key: process.env.CloudinaryApiKey,
  api_secret: process.env.CloudinaryApiSecret,
});

const routes = Router();

routes.post(
  '/post/create',
  UserAuthantication,
  PostImageMulter,
  //   function (req, res, next) {
  //     {
  //       UPLOAD(req, res, function (err) {
  //         if (err) {
  //           res.json({
  //             error: err.message,
  //             status: 201,
  //           });
  //         } else {
  //           next();
  //         }
  //       });
  //     }
  //   },
  PostsController.Create
);

routes.post('/deleteImage/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    // await cloud.uploader.destroy(`'${req.params.id}'`);
    let result = await cloud.uploader.destroy(
      `selfDevelopment/${req.params.id}`
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

export default routes;
