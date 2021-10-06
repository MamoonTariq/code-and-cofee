import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

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
        // console.log(accessToken);
        done(null, profile.id);
      }
    )
  );
};

export default AuthGooglePassport;
