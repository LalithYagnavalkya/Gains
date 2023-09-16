import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models

// schemas
import { addOrEditEmailSchema, editCustomerInput, usernameSchema } from '../schemas/admin.schema'

// services
import { editEmail, editUsername, insertIntoDB } from "../services/admin.service";

export const uploadCustomers = async (req: Request, res: Response) => {
    try {
        let users: any = [];
        if (String(req?.file?.path)) {

            fs.createReadStream(String(req?.file?.path))
                .pipe(csv({}))
                .on('data', (data: any) => users.push(data))
                .on('end', async () => {
                    // log.info(users)
                    await insertIntoDB(users, req, res)

                })

        } else {
            log.error('Error in upload Customers')
            return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
        }

    } catch (error: any) {
        log.error('Error in upload Customers')
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}

export const addCustomer = async (req: Request, res: Response) => {
    res.send('hello')
}

export const editCustomer = async (req: Request<editCustomerInput['params'], {}, editCustomerInput['body']>, res: Response) => {

    const { userId } = req.params;
    const operationType = req.body.operationType;

    switch (operationType) {

        case 'email': {
            const parsedData = addOrEditEmailSchema.safeParse({ userId, email: req.body.email })

            if (parsedData.success) {
                const { email } = parsedData.data;

                const { error, message } = await editEmail({ email, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: 'Please provide valid email' })
            break;
        }

        case 'username': {
            const parsedData = usernameSchema.safeParse({ userId, username: req.body.username })

            if (parsedData.success) {
                const { username } = parsedData.data;

                const { error, message } = await editUsername({ username, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }g
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Provide username' })
            break;
        }


        case 'phone':

            break;

        case 'workoutType':

            break;

        case 'joinedOn':

            break;

        case 'validUpto':

            break;

        default:
            break;
    }

}
