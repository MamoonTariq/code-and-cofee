import { UserController } from "../controllers/index.controllers.mjs";
import { Router } from "express";
import Passport from "passport";

const routes = Router();
routes.get("/user/sign-up", UserController.SignUp);

routes.get(
  "/google",
  Passport.authenticate("google", {
    scope: ["profile"],
  })
);

routes.get("/google/redirect", Passport.authenticate("google"), (req, res) => {
  res.send("you reached the callback");
});

export default routes;
