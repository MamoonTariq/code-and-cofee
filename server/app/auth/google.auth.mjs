import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { UsersModal } from "../modals/index.modals.mjs";

const AuthGooglePassport = () => {
  passport.serializeUser((user, done) => {
    console.log("serlize", user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("deserlize", user);
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
        UsersModal.find({ email: profile?._json?.email })
          .then((userExist) => {
            if (userExist.length === 0) {
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
              })
                .then((insertUser) => {
                  console.log(insertUser, "succesfuly");
                })
                .catch((error) => {
                  console.log(
                    error,
                    "not inserted ... failded due to some errors"
                  );
                });
            } else {
              console.log("user exists");
            }
          })
          .catch((error) => {
            console.log(error);
          });
        done(null, profile.id);
      }
    )
  );
};

export default AuthGooglePassport;
