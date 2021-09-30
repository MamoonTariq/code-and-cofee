import mongoose from "mongoose";

const MongodbConnection = () => {
  mongoose.connect(process.env.DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("mongoose connected");
  });
};

export default MongodbConnection;
