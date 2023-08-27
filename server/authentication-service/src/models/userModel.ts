import mongoose, { Document, Model } from "mongoose";

export interface IUser {
	username: string;
	email: string;
	isActive?: boolean;
	refreshToken?: string;
	profilePic?: string;
	mobile?: string;
	googleId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
interface IUserModel extends IUser, Document {}

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		refreshToken: { type: String },
		profilePic: { type: String },
		isActive: { type: Boolean, default: true },
		mobile: { type: String },
		googleId: { type: String },
	},
	{ timestamps: true },
);

const User: Model<IUserModel> = mongoose.model<IUserModel>("user", userSchema);

export default User;
