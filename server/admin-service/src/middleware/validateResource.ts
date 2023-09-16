import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateResource = (schema: AnyZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();

        } catch (error: any) {
            return res.status(400).send(error.errors);
        }
    }
}

export default validateResource;