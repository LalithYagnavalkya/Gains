import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv'
import User from '../models/user.model'

config({
    path: "../config/config.env",
});


export const generateToken = (userId: string, expireTime: string | null) => {
    const secretKey: string = <string>process.env.SECRET_KEY
    const token = jwt.sign({ userId }, secretKey, { expiresIn: expireTime ? expireTime: '1h' });
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
        req.body._user = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while authenticating the user' });
    }
};

// Middleware to authorize access based on user role
export const authorizeRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = req.body._user;
        if (!allowedRoles.includes(role)) {
           return res.status(401).json('Unauthorized');
        }
        next();
    };
}