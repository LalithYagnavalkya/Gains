import { Request, Response, NextFunction } from "express";

export const roleAuthorization = async (req: Request, res: Response, next: NextFunction, allowedRoles: string[]) => {
    if (req.body._loggedInUser.role === 'SUPER_ADMIN') {
        next();
    }
    return res.status(403).send('you are not authorized to this action');
};