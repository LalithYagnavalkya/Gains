import { Router, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'

//schemas
import { loginInput } from "../schemas/auth.schema";

//models
import User from '../models/user.model'
import dotenv from "dotenv";
import { generateToken } from "../middleware/auth.middleware";
dotenv.config({ path: "./src/config/config.env" });

export const login = async (req: Request<{}, {}, loginInput['body']>, res: Response) => {
    try {
        let user = await User.findOne({ email: req.body.email }).select('username email password profilePic role');
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
