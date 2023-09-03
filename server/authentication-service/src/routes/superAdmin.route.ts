import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from 'bcrypt'

//schemas
import { createAdminInput } from '../schemas/createUser.schema';

//models
import User from '../models/user.model'

const router = Router();

//super admin route to create an admin
router.post('/superadmin/registerAdmin', async (req: Request<{}, {}, createAdminInput['body']>, res: Response) => {
    try {
        let userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({ error: true, message: "Email id already taken" })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, process.env.BCRYPT_SALT_ROUNDS as string)
        req.body.password = hashedPassword;
        const user = await User.create(req.body)
        if (user) {
            return res.status(201).json({ error: false, message: 'User has been created Successfully', user })
        } else {
            return res.status(500).json({ error: true, message: "Ops!, Something went wrong" })
        }
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message })
    }
});

export default router;
