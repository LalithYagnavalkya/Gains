import { Request, Response } from "express";

// models
import User, { IUser } from "../models/user.model";

// schemas
import { addEmailInput, phoneInput, usernameInput } from "../schemas/admin.schema";
import { UserBulkUpload as UserBulkUploadSchema } from "../types/types";

// services
import { parseDate } from "../controllers/shared.controller";

export const insertIntoDB = async (users: any, req: any, res: any) => {
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
                username: user.username,
                phone: user.phone,
                lastPayOffDate: parseDate(user.startdate, 'dd-mm-yy'),
                validUpto: parseDate(user.enddate, 'dd-mm-yy'),
                joinedOn: new Date(),
                customerSerialNumber: user.slno,
                role: 'USER',
                partnerId: 1 // later take this from middleware

            }

            listOfUsers.push(userObj)
        })

        await User.insertMany(listOfUsers);

        return res.status(200).json({ error: false, message: 'successfully inserted data' })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}

export const editEmail = async (data: addEmailInput) => {

    const { email, userId } = data;

    const user = await User.findById(userId).select('email role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {
        const isEmailTaken = await User.findOne({ email }).select('email')

        if (isEmailTaken) { return Promise.resolve({ error: true, message: 'User with this email already exists' }) }

        user.email = email;
        await user.save();
        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}

export const editUsername = async (data: usernameInput) => {

    const { username, userId } = data;

    const user = await User.findById(userId).select('username role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {
        user.username = username;
        await user.save();
        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}

export const editPhone = async (data: phoneInput) => {

    const { phone, userId } = data;

    const user = await User.findById(userId).select('phone role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {

        const isPhoneTaken = await User.findOne({ phone }).select('phone')
        
        if (isPhoneTaken) {
            return Promise.resolve({ error: true, message: 'User with this phone number already exists' })
        }

        user.phone = phone;
        await user.save();
        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}