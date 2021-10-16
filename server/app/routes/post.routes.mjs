import { Router } from 'express';

import UserAuthantication from '../middlewares/authantication.middleware.mjs';
import { PostsController } from '../controllers/index.controllers.mjs';
import PostImageMulter from '../utils/multer/index.multer.mjs';

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

routes.post('/deleteImage/:id', PostsController.Delete);

export default routes;
