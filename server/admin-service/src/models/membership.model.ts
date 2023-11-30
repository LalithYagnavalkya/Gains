import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMembership extends Document {
    userId: Schema.Types.ObjectId;
    lastPaymentTransactionId?: Schema.Types.ObjectId;
    paymentStatus: String,
    membershipFee: number,
    membershipDuriation: number,
    validUpto: Date,
    active: true,
    lastPaymentDate: Date,
}

const membershipSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        lastPaymentTransactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
        paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'UPCOMMING', 'PAST_DUE'], default: 'PENDING' },
        membershipFee: { type: Number, required: true },
        membershipDuriation: { type: Number, required: true },
        lastPaymentDate: { type: Date },
        // Assume user is in middle of the month October 15th, and user next payment is on november 1st.
        // user payment status will be paid for october month. 
        // On October 23rd, seven days before the validUpto. user paymentStatus will become UPCOMMING
        // if user did not pay on 1st, paymentStatus will be PENDING.
        active: { type: Boolean, required: true, default: true },
        validUpto: { type: Date, required: true }
    },
    { timestamps: true },
);

const Membership: Model<IMembership> = mongoose.model<IMembership>("Membership", membershipSchema);

export default Membership;

