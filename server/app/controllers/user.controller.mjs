import { UsersModal } from "../modals/index.modals.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const SignUp = async (req, res) => {
  const { username = "", email = "", password = "" } = req.body;
  if (username && email && password) {
    UsersModal.find({ email: email }).then((userExist) => {
      if (!userExist.length) {
        bcrypt.hash(password, 10).then((hashPassword) => {
          UsersModal.create({
            username,
            email,
            password: hashPassword,
            authType: "website",
          })
            .then((responce) => {
              return res.json({
                message: "user created successfully",
                status: 200,
                date: responce,
              });
            })
            .catch((error) => {
              return res.json({
                error: error?.message,
                status: 201,
              });
            });
        });
      } else {
        return res.json({
          success: 0,
          message: "email already exist",
        });
      }
    });
  } else {
    return res.json({
      status: 201,
      error: "all fields are required",
    });
  }
};

export { SignUp };
