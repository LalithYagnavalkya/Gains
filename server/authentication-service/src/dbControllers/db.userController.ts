import User from "../models/userModel";
export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserById = (id: string) => User.findById(id);
