import express from "express";
import mongodbConnection from "./database.mjs";
import cors from "cors";
import "dotenv/config";
import routes from "../app/routes/index.routes.mjs";
import morgan from "morgan";
// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";
import Passport from "../app/auth/google.auth.mjs";

const MainApp = () => {
  const app = express();
  Passport();
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       callbackURL: "/auth/google/redirect",
  //       clientID: process.env.GoogleClientID,
  //       clientSecret: process.env.GoogleSercetKey,
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       console.log(profile);
  //     }
  //   )
  // );

  //mongodbConnection();
  app.use(morgan("tiny"));
  app.use(express.json());
  app.use(cors());

  app.use("/auth", routes);

  app.listen(process.env.PORT, () => {
    console.log("congratulations server started");
  });
};

export default MainApp;
