import { Router } from "express";
import dotenv from "dotenv";

//middlewares
import validateResource from "../middleware/validateResource";

//controllers
import { forgotPassword, login, resetPassword } from "../controllers/user.controller";

//schemas
import { createAdminSchema } from '../schemas/createUser.schema'
import { emailOrPhoneSchema, forgotPasswordSchema, loginSchema, resetPassowrdSchema } from '../schemas/auth.schema'

dotenv.config({ path: "./src/config/config.env" });

const router = Router();

router.post("/login", validateResource(loginSchema), login);

router.post("/forgotpassword", validateResource(forgotPasswordSchema), forgotPassword);

router.post('/resetpassword/:token', validateResource(resetPassowrdSchema), resetPassword)



// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.GOOGLE_CALLBACK_URL,
// 		failureRedirect: "/login/failed",
// 	}),
// );

// router.get("/logout", (req: Request, res: Response) => {
// 	if (req.user) {
// 		req.logout({}, (err) => {
// 			if (err) return res.status(500).json({ message: "Something went wrong." });
// 			res.redirect("http://localhost:3000/home");
// 		});
// 		res.send("done");
// 	}
// });



export default router;
