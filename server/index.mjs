import { express, config } from "./imports/index.mjs";

const app = express();
config(); //for env file

app.listen(process.env.PORT, () => {
  console.log("congratulations server started");
});
