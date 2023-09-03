import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from 'bcrypt'

//schemas
import { loginInput } from '../schemas/auth.schema'

//models
import User from '../models/user.model'

const router = Router();

//login
router.get("/login", async (req: Request<{}, {}, loginInput['body']>, res: Response) => {
	try {
		let user = await User.findOne({ email: req.body.email }).select('email password username friends')
		if (!user || user.isActive === false) {
			return res.status(400).json({ error: true, message: "Email not found" })
		}
		const isUser = await bcrypt.compare(req.body.password, user.password)
		if (!isUser) {
			return res.status(400).json({ error: true, message: "Wrong password" })
		}
		//generate token
		// let token = generateToken(user._id)
		// return res.status(200).json({ error: false, message: "Login successful", data: { user }, token: token })

	} catch (error: any) {
		return res.status(500).json({ error: true, message: error.message })
	}
});

//forgot password
//reset password
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.GOOGLE_CALLBACK_URL,
		failureRedirect: "/login/failed",
	}),
);

router.get("/logout", (req: Request, res: Response) => {
	if (req.user) {
		req.logout({}, (err) => {
			if (err) return res.status(500).json({ message: "Something went wrong." });
			res.redirect("http://localhost:3000/home");
		});
		res.send("done");
	}
});



router.post('/admin/login')
export default router;
