import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv'
import User from '../models/user.model'

config({
    path: "../config/config.env",
});


export const generateToken = (userId: string) => {
    const secretKey: string = <string>process.env.SECRET_KEY
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
};
interface tokenObj {
    userId: string;
    exp: number;
    iat: number;
}
export const verifyToken = (token: string): null | tokenObj => {
    try {
        const secretKey: string = <string>process.env.SECRET_KEY
        let decoded = jwt.verify(token, secretKey) as tokenObj;
        return decoded;
    } catch (error) {
        return null;
    }
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    if (token) {
        token = token.replace(/^Bearer\s+/, "");
    }
    const decoded = verifyToken(token);

    if (!decoded?.userId) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        const user = await User.findById(decoded?.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.body._loggedInUser = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while authenticating the user' });
    }
};