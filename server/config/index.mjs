import express from "express";
import mongodbConnection from "./database.mjs";
import "dotenv/config";
import routes from "../app/routes/index.routes.mjs";

const MainApp = () => {
  const app = express();
  mongodbConnection();

  app.use(express.json());
  app.use("/api/v1", routes);
  app.listen(process.env.PORT, () => {
    console.log("congratulations server started");
  });
};

export default MainApp;
