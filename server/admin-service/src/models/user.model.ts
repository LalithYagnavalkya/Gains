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
	validUpto?: Date;
	lastPayoffDate?: Date;
	paymentStatus: string;
	gender?: string;
	customerSerialNumber?: string,
	workoutType: string[],
	partnerId: number;
	membershipFee?: number;
	membershipDuriation?: number; //number of months
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
		validUpto: { type: Date },
		lastPayOffDate: { type: Date },
		paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'UPCOMMING_DUE'], default: 'PENDING' },
		// Assume user is in middle of the month October 15th, and user next payment is on november 1st.
		// user payment status will be paid for october month. 
		// On October 23rd, seven days before the validUpto. user paymentStatus will become UPCOMMING_DUE
		// if user did not pay on 1st, paymentStatus will be PENDING.
		gender: { type: String, enum: ['MALE', 'FEMALE'] },
		isPhoneVerified: { type: Boolean, default: false, required: false },
		isEmailVerified: { type: Boolean, default: false, required: false },
		partnerId: { type: Number, required: true },
		workoutType: [{ type: String }],
		customerSerialNumber: { type: String },
		membershipFee: { type: Number },
		membershipDuriation: { type: Number } // number of months
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

