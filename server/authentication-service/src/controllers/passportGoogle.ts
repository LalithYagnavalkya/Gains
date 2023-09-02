import {
	Strategy as GoogleStrategy,
	Profile,
	StrategyOptionsWithRequest,
	VerifyCallback,
} from "passport-google-oauth20";
import { Request } from "express";
import passport from "passport";
import dotenv from "dotenv";
import User, { IUser } from "../models/userModel";
import logger from "../utils/logger";
dotenv.config({ path: "./src/config/config.env" });

const strategyOptions: StrategyOptionsWithRequest = {
	clientID: process.env.GOOGLE_CLIENT_ID!,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	callbackURL: process.env.GOOGLE_CALLBACK_URL!,
	scope: "https://www.googleapis.com/auth/drive",
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
				profile: Profile,
				cb: VerifyCallback,
			) => {
				logger.info(refreshToken, accessToken, profile);

				try {
					const user = await User.findOne({ email: profile._json.email });
					if (user) {
						// Update refresh token and profile pic link
						if (refreshToken) {
							user.refreshToken = refreshToken;
						}
						// Update profile pic
						const profilePic = profile._json.picture!.replace("s96", "s400");
						user.profilePic = profilePic;
						await user.save();
					} else {
						// Create a new user
						if (profile && profile._json) {
							const profilePic = profile._json.picture!.replace("s96", "s400");
							const userObj: IUser = {
								username: profile._json.name!,
								email: profile._json.email!,
								refreshToken: refreshToken,
								profilePic: profilePic,
							};
							await User.create(userObj);
						}
					}

					if (user) {
						return cb(null, { testing: true });
					}
				} catch (err) {
					logger.error("Error signing up", err);
					cb(err as Error, undefined);
				}
			},
		),
	);

	// passport.serializeUser((user:Record<string,string>, cb) => {
	// 	cb(null, user.id);
	// 	logger.info("userid: " + user.id);
	// 	logger.info("serializing");
	// });

	// passport.deserializeUser(async (id: string, cb) => {
	// 	logger.info("deserializing");
	// 	try {
	// 		// const user = await User.findById(id);
	// 		// if (user) {
	// 		//   cb(null, user);
	// 		// }
	// 	} catch (err) {
	// 		logger.info("Error deserializing", err);
	// 		cb(err, null);
	// 	}
	// });
};

export default passportSetup;
