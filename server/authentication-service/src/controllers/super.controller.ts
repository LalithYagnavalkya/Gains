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

        const {
            password,
            phone,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS as String));
        
        await User.create({ ...req.body, password: hashedPassword, phone: phone, role: 'ADMIN' });

        // after creating user  we have to create his partner collection info

        return res.send("User successfully created");
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send("Account already exists");
        }

        return res.status(500).send(e);
    }
}