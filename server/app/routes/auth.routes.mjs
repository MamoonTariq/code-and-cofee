import { UserController } from "../controllers/index.controllers.mjs";
import { Router } from "express";
import Passport from "passport";

const routes = Router();
routes.get("/user/sign-up", UserController.SignUp);

routes.get(
  "/google",
  Passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

routes.get(
  "/google/redirect",
  await Passport.authenticate("google"),
  (req, res) => {
    console.log(req.user);
    res.redirect(`${process.env.GoogleLoginRedirect}?auth=${req.user}`);
  }
);

routes.post("/signUp", UserController.SignUp);

routes.post("/signIn", UserController.SignIn);

export default routes;
