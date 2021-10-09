import { UsersModal } from "../modals/index.modals.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

const transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GmailUser,
    pass: process.env.GmailPassword,
  },
});

const jwtSecret = process.env.JWT_SECRET;

const SignUp = (req, res) => {
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

const SignIn = (req, res) => {
  const { email = "", password = "" } = req.body;
  if (email && password) {
    UsersModal.findOne({ email: email, authType: "website" })
      .then((currentUser) => {
        if (currentUser) {
          bcrypt
            .compare(password, currentUser.password)
            .then((passwordMatched) => {
              if (passwordMatched) {
                const token = jwt.sign(
                  {
                    _id: currentUser._id,
                    email: currentUser.email,
                  },
                  jwtSecret
                );
                return res.json({
                  data: currentUser,
                  token: token,
                  message: "user created successfuly",
                  status: 200,
                });
              } else {
                return res.json({
                  error: "password not matched",
                  status: 201,
                });
              }
            });
        } else {
          return res.json({
            error: "user not exist",
            status: 201,
          });
        }
      })
      .catch((err) => {
        return res.json({
          error: err.message,
          status: 201,
        });
      });
  } else {
    return res.json({
      error: "fields are required",
      status: 201,
    });
  }
};

const ForgotPassword = (req, res) => {
  const { email = "" } = req.body;
  if (email) {
    UsersModal.findOne({ email: email, authType: "website" }).then(
      (emailExist) => {
        if (emailExist) {
          const mailOption = {
            from: process.env.GmailUser,
            to: emailExist.email,
            subject: "You New Password",
            text: "sadfasdfasdfasdfasdfasd",
          };
          transport.sendMail(mailOption, (error, info) => {
            if (info) {
              return res.json({
                message: "check your email",
                status: 200,
              });
            } else {
              return res.json({
                error: "something went wrong try again later",
                status: 201,
              });
            }
          });
        } else {
          return res.json({
            error: "email no found",
            status: 201,
          });
        }
      }
    );
  } else {
    return res.json({
      error: "email required",
      status: 201,
    });
  }
};

export { SignUp, SignIn, ForgotPassword };
