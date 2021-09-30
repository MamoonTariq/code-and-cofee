import { express, config, MongodbConnection } from "./imports/index.mjs";

const app = express();
config(); //for env file
MongodbConnection();
app.listen(process.env.PORT, () => {
  console.log("congratulations server started");
});
