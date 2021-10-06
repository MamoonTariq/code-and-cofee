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

routes.get(
  "/google/redirect",
  await Passport.authenticate("google"),
  (req, res) => {
    //  res.send(req.user);
    // console.log(req.user, "redirec");
    res.send("yoloooooooooooo bachaaaaa");
  }
);

routes.get("/dashboard", (req, res) => {
  console.log(req.user, "enter in dashbaord");
  res.send("your dashboard");
});

// var authChecker = (req, res, next) => {
//   console.log(req.user);
//   if (!req.user) {
//     console.log("not loggedin");
//   } else {
//     next();
//   }
// };

export default routes;
