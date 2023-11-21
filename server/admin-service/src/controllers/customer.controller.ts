import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models
import User, { IUser } from "../models/user.model";

// schemas
import {
    addCustomerInput, addOrEditEmailSchema, editCustomerInput, emailOrPhoneInput, getCustomersInput, getCustomersSchema, joinedOnSchema,
    phoneSchema, usernameSchema, validUptoSchema, workoutSchmea
} from '../schemas/customer.schema'

// services
import {
    createCustomer,
    editEmail, editJoinedOn, editPhone, editUsername,
    editValidUpto, editWorkoutType, insertIntoDB
} from "../services/admin.service";
import { paginateResults } from "./shared.controller";

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
    const { email, phone, } = req.body;
    try {
        const userExists = await User.findOne({
            $or: [{ email }, { phone }]
        });

        if (userExists) {
            return res.status(409).json({ error: true, message: "A user with this email or phone already exists" })
        }

        const { error, message } = await createCustomer(req.body)

        if (error) {
            return res.status(409).json({ error: true, message })
        }

        return res.status(201).json({ error, message })

    } catch (error) {
        return Promise.resolve({ error: true, message: 'something went wrong' })
    }

}

export const editCustomer = async (req: Request<editCustomerInput['params'], {}, editCustomerInput['body']>, res: Response) => {

    const { userId } = req.params;
    const operationType = req.body.operationType;

    try {
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
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message })
    }
}

export const getCustomers = async (req: Request, res: Response) => {
    type queryType = {
        partnerId: number;
        role: string;
        active: boolean;
        paymentStatus?: { $in: string[] } | string[];
    }

    try {
        // couldn't figure how to use query without getting overloaded error in routes file
        // so using this instead for get apis 

        // validating input
        const reqInput = getCustomersSchema.parse({ body: req.body, query: req.query })
        const { page, type, limit, partnerId, paymentStatus } = reqInput.query;
        const { _user } = reqInput.body;
        let _partnerId = _user.partnerId;
        const _paymentStatuses = ['PENDING, PAID, UPCOMMING'];

        if (_user.role === 'SUPER_ADMIN' && partnerId) {
            _partnerId = partnerId
        }
        const resObj = {
            users: [] as IUser[],
            totalCount: 0,
        };

        const query: queryType = {
            partnerId: _partnerId,
            role: 'USER',
            active: true,
        }

        if (paymentStatus) {
        query.paymentStatus = { '$in': paymentStatus }
        }

        switch (type) {
            case 'recentlyjoined': {
                const { totalCount, data } = await paginateResults(User, query, page, limit, 'createdAt', -1, '');
                resObj['users'] = data ?? [];
                resObj['totalCount'] = totalCount ?? [];
            }
                break;
            case 'recentlypaid': {
                const { totalCount, data } = await paginateResults(User, query, page, limit, 'lastPayOffDate', -1, '');
                resObj['users'] = data ?? [];
                resObj['totalCount'] = totalCount ?? [];
                break;
            }
            default:
                break;
        }

        return res.status(200).json({
            error: false,
            token: req.body.token,
            ...resObj,
        })


    } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).send(error.errors);
        }
        return res.status(500).json({ error: true, message: error.message })
    }
}

export const getCustomerById = async (req: Request, res: Response) => {
    
}

export const checkIfEmailOrPhoneExists = async (req: Request<emailOrPhoneInput['body']>, res: Response) => {
    const { email, phone } = req.body;

    try {
        const isFound = await User.findOne({ $or: [{ email: email ? email : "" }, { phone: phone ? phone: ""}] }).lean()

        if (isFound) {
            return res.status(409).json({ error: true, message: 'Email Already Exists' })
        }
        return res.status(200).json({ error: false, message: 'Good to go!' });
    } catch (e: any) {
        return res.status(500).json({ error: true, message: e.message })
    }
}