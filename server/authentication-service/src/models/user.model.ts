import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
	username: string;
	email?: string;
	active?: boolean;
	refreshToken?: string;
	profilePic?: string;
	phone?: string;
	googleId?: string;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
	role: string;
	joinedOn?: Date;
	gender?: string;
	customerSerialNumber?: string,
	workoutType: string[],
	partnerId: number;
}

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String },
		refreshToken: { type: String },
		profilePic: { type: String },
		active: { type: Boolean, default: true },
		phone: { type: String, unique: true },
		googleId: { type: String },
		password: { type: String, select: false },
		role: {
			type: String,
			enum: ['ADMIN', 'SUPER_ADMIN', 'USER'],
			default: 'USER'
		},
		joinedOn: { type: Date },
		gender: { type: String, enum: ['MALE', 'FEMALE'] },
		isPhoneVerified: { type: Boolean, default: false, required: false },
		isEmailVerified: { type: Boolean, default: false, required: false },
		partnerId: { type: Number, required: true },
		workoutType: [{ type: String }],
		customerSerialNumber: { type: String },
	},
	{ timestamps: true },
);

userSchema.pre<IUser>("save", function (next) {
	// Convert the username to lowercase
	if (this.isModified("username")) {
		this.username = this.username.toLowerCase();
	}
	if (this.email) {
		this.email = this.email.toLowerCase();
	}
	next();
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;

