import mongoose from "mongoose";

const mongodbConnection = () => {
  mongoose.connect(process.env.DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("mongoose connected");
  });
};

export default mongodbConnection;
