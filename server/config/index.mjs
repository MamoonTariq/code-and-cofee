import express from "express";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import mongodbConnection from "./database.mjs";
import { AuthRoutes, PostRoutes } from "../app/routes/index.routes.mjs";
import AuthGooglePassport from "../app/auth/google.auth.mjs";
import Message from "../app/common/utils/index.mjs";

const app = express();

const MainApp = () => {
  mongodbConnection(); //DB Connection

  app.use(passport.initialize()); // initialize passport

  AuthGooglePassport(); // Google Authantication

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.json({
      message: "contact with admin",
    });
  });

  app.use("/auth", AuthRoutes);
  app.use("/api/v1", PostRoutes);

  app.listen(process.env.PORT, () => {
    console.log(Message({ key: "serverStarted", status: 2 }));
  });
};

export default MainApp;
