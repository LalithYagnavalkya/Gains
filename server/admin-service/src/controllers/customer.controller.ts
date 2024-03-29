import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models
import User, { IUser } from "../models/user.model";

// schemas
import {
    addCustomerInput, addOrEditEmailSchema, editCustomerInput, emailOrPhoneInput, getCustomerDetailsInput, getCustomersInput, getCustomersSchema, getRecentCustomersInput, joinedOnSchema,
    phoneSchema, usernameSchema, validUptoSchema, workoutSchmea
} from '../schemas/customer.schema'
import { IUserInfo } from "../schemas/customer.controller.schema";
import Membership from "../models/membership.model";

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
    try {
        const { email, phone, } = req.body;
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

export const updateCustomerDetails = async (req: Request<{}, {}, editCustomerInput['body']>, res: Response) => {

    const { operationType, customerId } = req.body;

    try {
        // switch (operationType) {

        //     case 'email': {
        //         const parsedData = addOrEditEmailSchema.safeParse({ userId: customerId, email: req.body.email })

        //         if (parsedData.success) {
        //             const { email } = parsedData.data;

        //             const { error, message } = await editEmail({ email, customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: 'Please provide valid email' })
        //         break;
        //     }

        //     case 'username': {
        //         const parsedData = usernameSchema.safeParse({ userId: customerId, username: req.body.username })

        //         if (parsedData.success) {
        //             const { username } = parsedData.data;

        //             const { error, message } = await editUsername({ username, userId: customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Provide username' })
        //         break;
        //     }

        //     case 'phone': {
        //         const parsedData = phoneSchema.safeParse({ userId: customerId, phone: req.body.phone })

        //         if (parsedData.success) {
        //             const { phone } = parsedData.data;

        //             const { error, message } = await editPhone({ phone, userId: customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid phone number' })
        //         break;
        //     }

        //     case 'workoutType': {
        //         const parsedData = workoutSchmea.safeParse({ userId: customerId, workoutTypes: req.body.workoutTypes })

        //         if (parsedData.success) {
        //             const { workoutTypes } = parsedData.data;

        //             const { error, message } = await editWorkoutType({ workoutTypes, userId: customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid workoutType ' })
        //         break;
        //     }

        //     case 'joinedOn': {
        //         const parsedData = joinedOnSchema.safeParse({ userId: customerId, joinedOn: req.body.joinedOn })

        //         if (parsedData.success) {
        //             const { joinedOn } = parsedData.data;

        //             const { error, message } = await editJoinedOn({ joinedOn, userId: customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid joinedOn Date ' })
        //         break;
        //     }

        //     case 'validUpto':
        //         const parsedData = validUptoSchema.safeParse({ userId: customerId, validUpto: req.body.validUpto })

        //         if (parsedData.success) {
        //             const { validUpto } = parsedData.data;

        //             const { error, message } = await editValidUpto({ validUpto, userId: customerId });

        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }

        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid validupto Date ' })
        //         break;

        //     default:
        //         break;
        // }
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
        $or?: Array<{ [key: string]: { $regex: string } }> | string[];
    }

    try {
        // couldn't figure how to use query without getting overloaded error in routes file
        // so using this instead for get apis 

        // validating input
        const reqInput = getCustomersSchema.parse({ body: req.body, query: req.query })
        const { page, type, limit, partnerId, paymentStatus, usernameOrPhone } = reqInput.query;
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
        if (usernameOrPhone) {
            query['$or'] = [{ username: { $regex: usernameOrPhone } }, { phone: { $regex: usernameOrPhone } }]
        }

        switch (type) {
            case 'recentlyjoined': {
                const { totalCount, data: users } = await paginateResults(User, query, page, limit, 'createdAt', -1, '');
                const memberships = await Membership.find({ userId: users.map(x => x._id) }).lean();
                const usersData: IUserInfo[] = []

                users.forEach((user, index) => {
                    const currentUserMembership = memberships.find(m => String(m.userId) === String(user._id))
                    usersData[index] = user;
                    if (currentUserMembership) {
                        usersData[index]['membershipFee'] = currentUserMembership?.membershipFee;
                        usersData[index]['paymentStatus'] = currentUserMembership?.paymentStatus;
                        usersData[index]['validUpto'] = currentUserMembership?.validUpto;
                    }
                })

                resObj['users'] = users ?? [];
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

export const getCustomerDetails = async (req: Request<getCustomerDetailsInput['params']>, res: Response) => {
    try {
        const { userId } = req.params;
        const { _user } = req.body;
        let resObj: any = {};

        const [user, membership] = await Promise.all([
            User.findById(userId).lean(),
            Membership.findOne({ userId }).lean()
        ])

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found!' })
        }

        resObj = user;
        resObj['membershipDetails'] = membership;



        return res.status(200).json({
            error: false,
            token: req.body.token,
            data: resObj
        })
    } catch (error: any) {
        if (error?.name === 'ZodError') {
            return res.status(400).send(error.errors);
        }
        return res.status(500).json({ error: true, message: error.message })
    }
}

export const checkIfEmailOrPhoneExists = async (req: Request<emailOrPhoneInput['body']>, res: Response) => {
    const { email, phone } = req.body;

    try {
        const isFound = await User.findOne({ $or: [{ email: email ? email : "" }, { phone: phone ? phone : "" }] }).lean()

        if (isFound) {
            return res.status(409).json({ error: true, message: 'Email Already Exists' })
        }
        return res.status(200).json({ error: false, message: 'Good to go!' });
    } catch (e: any) {
        return res.status(500).json({ error: true, message: e.message })
    }
}