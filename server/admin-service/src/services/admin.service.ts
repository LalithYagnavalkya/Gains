import { Request, Response } from "express";

// models
import User, { IUser } from "../models/user.model";

// schemas
import { addEmailInput, joinedOnInput, phoneInput, usernameInput, validUptoInput, wroukoutTypeInput } from "../schemas/admin.schema";
import { UserBulkUpload as UserBulkUploadSchema } from "../types/types";

// services
import { parseDate, parseWorkoutTypes } from "../controllers/shared.controller";
import Classification from "../models/classification.model";

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

export const editWorkoutType = async (data: wroukoutTypeInput) => {

    const { workoutTypes, userId } = data;

    const user = await User.findById(userId).select('workout role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {


        const { error, message, updatedWorkoutTypes } = await parseWorkoutTypes(workoutTypes);

        if (error) {
            return Promise.resolve({ error, message });
        }
        
        user.workoutType = updatedWorkoutTypes;
        await user.save();

        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}

export const editJoinedOn = async (data: joinedOnInput) => {

    const { joinedOn, userId } = data;

    const parsedDate = new Date(joinedOn);

    if (isNaN(parsedDate.getTime())) {
        // invalid date
        return Promise.resolve({ error: true, message: 'Invalid Date' });
    }

    const user = await User.findById(userId).select('joinedOn role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {
        user.joinedOn = parsedDate;
        await user.save();

        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}

export const editValidUpto = async (data: validUptoInput) => {

    const { validUpto, userId } = data;

    const parsedDate = new Date(validUpto);

    if (isNaN(parsedDate.getTime())) {
        // invalid date
        return Promise.resolve({ error: true, message: 'Invalid Date' });
    }

    const user = await User.findById(userId).select('validUpto role');

    if (user && String(user?._id) === String(userId) && user.role === 'USER') {
        user.validUpto = parsedDate;
        await user.save();

        return Promise.resolve({ error: false, message: 'Updated sucessfuly' })
    }
    else {
        return Promise.resolve({ error: true, message: 'User not found' });
    }

}
