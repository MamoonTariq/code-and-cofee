import { Router } from "express";

import UserAuthantication from "../middlewares/authantication.middleware.mjs";
import { PostsController } from "../controllers/index.controllers.mjs";

const routes = Router();

routes.post("/post/create", UserAuthantication, PostsController.Create);

export default routes;
