import mongoose from "mongoose";
import Message from "../app/common/utils/index.mjs";

const mongodbConnection = () => {
  mongoose.connect(process.env.DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log(
      Message({
        key: "MongoConnect",
      })
    );
  });
};

export default mongodbConnection;
