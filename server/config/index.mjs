import express from "express";
import mongodbConnection from "./database.mjs";
import cors from "cors";
import "dotenv/config";
import routes from "../app/routes/index.routes.mjs";
import morgan from "morgan";
import AuthGooglePassport from "../app/auth/google.auth.mjs";
import passport from "passport";
const app = express();

const MainApp = () => {
  //DB Connection
  mongodbConnection();

  // initialize passport
  app.use(passport.initialize());

  // Google Authantication
  AuthGooglePassport();

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());

  app.use("/auth", routes);

  app.listen(process.env.PORT, () => {
    console.log("Server Started Successfully");
  });
};

export default MainApp;
