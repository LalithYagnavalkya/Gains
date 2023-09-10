import { Router, Request, Response, NextFunction } from "express";
import fs from 'fs'
import csv from 'csv-parser'

import log from "../utils/logger";

export const uploadCustomers = async (req: Request, res: Response) => {
    try {
        let emails: any = [];
        if (String(req?.file?.path)) {

            fs.createReadStream(String(req?.file?.path))
                .pipe(csv({}))
                .on('data', (data: any) => emails.push(data))
                .on('end', async () => {
                    log.info(emails)
                    // await findEmailsInDb(emails, req, res)

                })
        } else {
            return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
        }

    } catch (error: any) {
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}   