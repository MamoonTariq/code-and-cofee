import { UserController } from "../controllers/index.controllers.mjs";
import { Router } from "express";

console.log(UserController);

const routes = Router();
routes.get("/user/signUp", UserController.SignUp);

export default routes;
