import { Router, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'

//schemas
import { createAdminInput } from '../schemas/createUser.schema';

//models
import User from '../models/user.model'
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/config.env" });

export const registerAdmin = async (req: Request<{}, {}, createAdminInput['body']>, res: Response) => {
    try {
        let userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({ error: true, message: "Email id already taken" })
        }
        console.log(process.env.BCRYPT_SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUNDS as String))
        req.body.password = hashedPassword;
        const user = await User.create({...req.body, role: 'ADMIN'})
        if (user) {
            return res.status(201).json({ error: false, message: 'User has been created Successfully', user })
        } else {
            return res.status(500).json({ error: true, message: "Ops!, Something went wrong" })
        }
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message })
    }
}