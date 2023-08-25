import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Request } from "express";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/userModel";
dotenv.config({ path: "./src/config/config.env" });


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
        console.log(refreshToken, accessToken, profile)

        try {
          let user = await User.findOne({ email: profile._json.email });
          if(user){
            //update refresh token and profile pic link
            if(refreshToken){
              user.refreshToken = refreshToken
            }
            //update profile pic 
            const profilePic = profile._json.picture.replace("s96", "s400");
            user.profilePic = profilePic;
            await user.save();
          }else{
            //create a new user
            if (profile && profile._json){
              const profilePic = profile._json.picture.replace("s96", "s400");
              let userObj = {
                username: profile._json.name,
                email: profile._json.email,
                refreshToken: refreshToken,
                profilePic: profilePic
              }
              await User.create(userObj);
            }
            
          }

          if (user) {
            return cb(null, {testing: true});
          }
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
