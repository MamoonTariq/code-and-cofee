import mongoose from "mongoose";

const Schema = mongoose.Schema;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "invalid email address...fromSchema"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "invalid email address...fromSchema",
    ],
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super admin"],
    default: "user",
  },
  authType: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const UsersModal = mongoose.model("user", userSchema);

export default UsersModal;
