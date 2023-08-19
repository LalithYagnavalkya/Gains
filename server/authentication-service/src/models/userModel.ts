import { timeStamp } from 'console';
import { Module } from 'module'
import mongoose, { Document, Model } from 'mongoose'

interface IUser extends Document {
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date

}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    // authentication: {
    //     password: { type: String, required: true, select: false },
    //     salt: { type: String, select: false },
    //     sessionToken: { type: String, select: false }
    // },
    isActive: { type: Boolean, default: false }
}, { timestamps: true })

const User: Model<IUser> = mongoose.model<IUser>('user', userSchema)

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserById = (id: string) => User.findById(id)

export default User
