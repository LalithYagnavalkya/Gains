import { Router, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'

//schemas
import { createAdminInput } from '../schemas/createUser.schema';

//models
import User from '../models/user.model'
import dotenv from "dotenv";
import Partner from "../models/partner.model";

dotenv.config({ path: "./src/config/config.env" });

export const registerAdmin = async (req: Request<{}, {}, createAdminInput['body']>, res: Response) => {
    try {

        const {
            username,
            email,
            password,
            phone,
            partnerName,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS as String));


        let partnerId = 1;


        let lastPartner = await Partner.findOne({}).sort({ createdAt: -1 }) // fetch last partner Id

        if (lastPartner !== null) {
            partnerId = lastPartner.partnerId;
            partnerId++
        }

        const user = await User.create({ email, username: username, password: hashedPassword, phone: phone, role: 'ADMIN', partnerId: partnerId });

        let partnerObjInput = {
            partnerId: partnerId,
            name: partnerName.toLocaleLowerCase()
        }

        await Partner.create(partnerObjInput);

        return res.send("User successfully created");
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send("Account already exists");
        }
        return res.status(500).send(e);
    }
}