import { timeStamp } from 'console';
import { Module } from 'module'
import mongoose, { model } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    isActive: { type: Boolean, default: false }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserById = (id: string) => User.findById(id)
module.exports = User;