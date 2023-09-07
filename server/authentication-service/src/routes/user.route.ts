import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from 'bcrypt'
import { login } from "../controllers/user.controller";

//schemas
import { loginInput } from '../schemas/auth.schema'

//models
import User from '../models/user.model'

const router = Router();

//login
router.post("/login", login);

//forgot password
//reset password



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



router.post('/admin/login')
export default router;
