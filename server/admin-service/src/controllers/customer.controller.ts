import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models
import User, { IUser } from "../models/user.model";
import { UserBulkUpload as UserBulkUploadSchema } from "../types/types";
import { parseDate } from "./shared.controller";

// schemas

const insertIntoDB = async (users: any, req: any, res: any) => {
    try {
        // Convert keys to lowercase for each object in the array
        const convertedData = users.map((obj: any) => {
            const newObj: any = {};
            for (const key in obj) {
                newObj[key.toLowerCase()] = obj[key];
            }
            return newObj;
        });

        const listOfUsers: UserBulkUploadSchema[] = []

        convertedData.map((user: any) => {
            const userObj: UserBulkUploadSchema = {
                username: user.name,
                mobile: user.phone,
                // joinedOn: user.joinedon ?  : new Date(),
                role: 'USER'
            }
            if (!user.joinedon) {
                userObj.joinedOn = new Date();
            } else {
                userObj.joinedOn = parseDate(user.joinedon, 'dd-mm-yy')
            }

            listOfUsers.push(userObj)
        })

        await User.insertMany(listOfUsers);

        return res.status(200).json({ error: false, message: 'successfully inserted data' })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}

export const uploadCustomers = async (req: Request, res: Response) => {
    try {
        let users: any = [];
        if (String(req?.file?.path)) {

            fs.createReadStream(String(req?.file?.path))
                .pipe(csv({}))
                .on('data', (data: any) => users.push(data))
                .on('end', async () => {
                    // log.info(users)
                    console.log(users)
                    await insertIntoDB(users, req, res)

                })

        } else {
            return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
        }

    } catch (error: any) {
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}   
