import { Router, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'

//models
import User from '../models/user.model'
import dotenv from "dotenv";
import { generateToken, verifyToken } from "../middleware/auth.middleware";
dotenv.config({ path: "./src/config/config.env" });

//schemas
import { forgotPasswordInput, loginInput, resetPassowrdInput } from "../schemas/auth.schema";
import sendEmail from "../utils/mailer";


export const login = async (req: Request<{}, {}, loginInput['body']>, res: Response) => {
    try {

        const {
            email,
            password
        } = req.body;

        let user = await User.findOne({ email: email }).select('username email password profilePic role');

        if (!user || user.active === false) {
            return res.status(400).json({ error: true, message: "Email not found" })
        }
        if (user.password) {
            const isUser = await bcrypt.compare(password, user.password);

            if (!isUser) {
                return res.status(401).json({ error: true, message: "Wrong password" });
            }

        }

        //generate token
        let token = generateToken(user._id)

        const userObj = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
        };

        return res.status(200).json({ error: false, message: "Login successful", user: userObj, token })

    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message })
    }
}

export const forgotPassword = async (req: Request<{}, {}, forgotPasswordInput['body']>, res: Response) => {

    const message =
        "If a user with that email is registered you will receive a password reset email";

    const {
        email,
    } = req.body;

    let user = await User.findOne({ email }).select('email').lean();

    if (!user || user.active === false) {
        return res.send(message);
    }

    const token = generateToken(user._id);

    await sendEmail({
        to: user.email,
        from: "nodeAdmin@techvedhas.com",
        subject: "Reset your password",
        text: `To reset your password, click on the following link: http://localhost:3000/reset-password?token=${token}`,
    });

    return res.send(message);
}

export const resetPassword = async (req: Request<resetPassowrdInput['params'], {}, resetPassowrdInput['body']>, res: Response) => {

    const { token } = req.params;
    const { password } = req.body;
    const message = 'Could not reset password'

    try {

        const decoded = verifyToken(token)
        const user = await User.findById(decoded?.userId).select('password');

        if (!user) {
            return res.status(400).send(message);
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS as String));

        //update password
        user.password = hashedPassword;

        user.save();

        return res.send("Successfully updated password");

    } catch (e: any) {
        return res.status(500).send(message);
    }

}