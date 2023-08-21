import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Request } from "express";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/userModel";
dotenv.config({ path: "./src/config/config.env" });


console.log("this inside passportgoogle");
const strategyOptions: any = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: 'https:/www.googleapis.com/aut/drive',
  accessType: 'offline', // Use type assertion for 'accessType'
  passReqToCallback: true,
};

const passportSetup = () => {
  passport.use(
    new GoogleStrategy(
      strategyOptions,
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        cb: any
      ) => {
        console.log(accessToken + "----------------" + refreshToken)
        console.log(profile);
        const image = profile._json.picture.replace("s96", "s400");
        const defaultUser = {
          fullName: `${profile.name?.givenName} ${profile.name?.familyName}`,
          email: profile.emails?.[0].value,
          givenName: profile.name?.givenName,
          avatar: image,
          googleId: profile.id,
        };

        try {
          // let user = await User.findOne({ googleId: profile.id });

          // if (!user) {
          //   const newUser = new User(defaultUser);
          //   await newUser.save();
          //   user = newUser;
          // }

          // if (user) {
          //   return cb(null, user);
          // }
        } catch (err) {
          console.log("Error signing up", err);
          cb(err, null);
        }
      }
    )
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
    console.log("userid: " + user.id);
    console.log("serializing");
  });

  passport.deserializeUser(async (id: string, cb) => {
    console.log("deserializing");
    try {
      // const user = await User.findById(id);

      // if (user) {
      //   cb(null, user);
      // }
    } catch (err) {
      console.log("Error deserializing", err);
      cb(err, null);
    }
  });
};

export default passportSetup;
