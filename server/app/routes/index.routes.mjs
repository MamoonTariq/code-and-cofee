import { UserController } from "../controllers/index.controllers.mjs";
import { Router } from "express";

const routes = Router();
routes.get("/user/sign-up", UserController.SignUp);

export default routes;
