import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
	username: string;
	email?: string;
	isActive?: boolean;
	refreshToken?: string;
	profilePic?: string;
	phone?: string;
	googleId?: string;
	createdAt?: Date;
	updatedAt?: Date;
	password?: string;
	role: string;
	joinedOn?: Date;
	validUpto?: Date;
	lastPayoffDate?: Date;
	paymentStatus: string;
	gender?: string;
	customerSerialNumber?: string,
	partnerId: number;
}

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String },
		refreshToken: { type: String },
		profilePic: { type: String },
		isActive: { type: Boolean, default: true },
		phone: { type: String, unique: true },
		googleId: { type: String },
		password: { type: String, select: false },
		role: {
			type: String,
			enum: ['ADMIN', 'SUPER_ADMIN', 'USER'],
			default: 'USER'
		},
		joinedOn: { type: Date },
		validUpto: { type: Date },
		lastPayOffDate: { type: Date },
		paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'UPCOMMING_PAYMENT_DUE'], default: 'PENDING' },
		gender: { type: String, enum: ['MALE', 'FEMALE'] },
		isPhoneVerified: { type: Boolean, default: false, required: false },
		isEmailVerified: { type: Boolean, default: false, required: false },
		partnerId: { type: Number, required: true },
		customerSerialNumber: { type: String }
	},
	{ timestamps: true },
);

userSchema.pre<IUser>("save", function (next) {
	// Convert the username to lowercase
	if (this.isModified("username")) {
		this.username = this.username.toLowerCase();
	}
	next();
});

const User: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default User;

