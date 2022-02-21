import { UserController } from "../controllers/index.controllers.mjs";
import { Router } from "express";
import Passport from "passport";

const routes = Router();

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
    res.redirect(`${process.env.GoogleLoginRedirect}?auth=${req.user}`);
  }
);

routes.post("/signUp", UserController.SignUp);

routes.post("/signIn", UserController.SignIn);

routes.post("/forgotPassword", UserController.ForgotPassword);

export default routes;
