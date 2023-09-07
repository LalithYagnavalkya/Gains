import { Router, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'

//models
import User from '../models/user.model'
import dotenv from "dotenv";
import { generateToken } from "../middleware/auth.middleware";
dotenv.config({ path: "./src/config/config.env" });

//schemas
import { forgotPasswordInput, loginInput } from "../schemas/auth.schema";


export const login = async (req: Request<{}, {}, loginInput['body']>, res: Response) => {
    try {

        const {
            email,
        } = req.body;

        let user = await User.findOne({ email: email }).select('username email password profilePic role');
        if (!user || user.isActive === false) {
            return res.status(400).json({ error: true, message: "Email not found" })
        }
        const isUser = await bcrypt.compare(req.body.password, user.password)
        if (!isUser) {
            return res.status(400).json({ error: true, message: "Wrong password" })
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

    let user = await User.findOne({ user_email: email });

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // user.otp = randomNumber;

    if (!user) {
        return res.send(message);
    }

    if (!user || user.isActive === false) {
        return res.status(400).json(message)
    }
}