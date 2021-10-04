import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const Passport = () => {
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleSercetKey,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
};

export default Passport;
