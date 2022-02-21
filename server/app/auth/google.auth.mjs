import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { UsersModal } from "../modals/index.modals.mjs";

import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const AuthGooglePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleSercetKey,
      },
      (accessToken, refreshToken, profile, done) => {
        UsersModal.findOne({ email: profile?._json?.email }).then(
          (userExist) => {
            if (!userExist) {
              const user = profile?._json;
              const username = user?.name,
                email = user?.email,
                imgUrl = user?.picture,
                authType = "google";
              UsersModal.create({
                username,
                email,
                imgUrl,
                authType,
              }).then((insertUser) => {
                const token = jwt.sign(
                  {
                    _id: insertUser._id,
                    email: insertUser.email,
                  },
                  jwtSecret
                );
                done(null, token);
              });
            } else {
              const token = jwt.sign(
                {
                  _id: userExist._id,
                  email: userExist.email,
                },
                jwtSecret
              );
              done(null, token);
            }
          }
        );
      }
    )
  );
};

export default AuthGooglePassport;
