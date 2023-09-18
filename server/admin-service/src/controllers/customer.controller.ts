import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models
import User from "../models/user.model";

// schemas
import {
    addCustomerInput, addOrEditEmailSchema, editCustomerInput, joinedOnSchema,
    phoneSchema, usernameSchema, validUptoSchema, workoutSchmea
} from '../schemas/admin.schema'

// services
import {
    editEmail, editJoinedOn, editPhone, editUsername,
    editValidUpto, editWorkoutType, insertIntoDB
} from "../services/admin.service";

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

export const addCustomer = async (req: Request<{}, {}, addCustomerInput['body']>, res: Response) => {
    const { username, email, phone, validUpto,
        joinedOn, gender, workoutTypes, membershipFee } = req.body;

    const userExists = await User.findOne({
        $or: [{ email }, { phone }]
    });

    if(userExists){
        return res.status(409).json({ error: true, message: "A user with this email or phone already exists" }) 
    }
    
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
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Provide username' })
            break;
        }

        case 'phone': {
            const parsedData = phoneSchema.safeParse({ userId, phone: req.body.phone })

            if (parsedData.success) {
                const { phone } = parsedData.data;

                const { error, message } = await editPhone({ phone, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid phone number' })
            break;
        }

        case 'workoutType': {
            const parsedData = workoutSchmea.safeParse({ userId, workoutTypes: req.body.workoutTypes })

            if (parsedData.success) {
                const { workoutTypes } = parsedData.data;

                const { error, message } = await editWorkoutType({ workoutTypes, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid workoutType ' })
            break;
        }

        case 'joinedOn': {
            const parsedData = joinedOnSchema.safeParse({ userId, joinedOn: req.body.joinedOn })

            if (parsedData.success) {
                const { joinedOn } = parsedData.data;

                const { error, message } = await editJoinedOn({ joinedOn, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid joinedOn Date ' })
            break;
        }

        case 'validUpto':
            const parsedData = validUptoSchema.safeParse({ userId, validUpto: req.body.validUpto })

            if (parsedData.success) {
                const { validUpto } = parsedData.data;

                const { error, message } = await editValidUpto({ validUpto, userId });

                if (error) {
                    return res.status(409).json({ error, message })
                }
                return res.status(200).json({ error, message })
            }

            return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid validupto Date ' })
            break;

        default:
            break;
    }

}
