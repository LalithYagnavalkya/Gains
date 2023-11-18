import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPaymentDue extends Document {
    userId: Schema.Types.ObjectId;
    transactionId?: Schema.Types.ObjectId;
    paymentType: String,
    status: String,
}

const paymentDueSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
        status: { type: String, enum: ['PENDING', 'PAID', 'UPCOMMING'], default: 'PENDING' },
        // Assume user is in middle of the month October 15th, and user next payment is on november 1st.
		// user payment status will be paid for october month. 
		// On October 23rd, seven days before the validUpto. user paymentStatus will become UPCOMMING_DUE
		// if user did not pay on 1st, paymentStatus will be PENDING.
        active: { type: Boolean, required: true, default: true },
        dueDate: { type: Date, required: true }
    },
    { timestamps: true },
);

const PaymentDue: Model<IPaymentDue> = mongoose.model<IPaymentDue>("PaymentDue", paymentDueSchema);

export default PaymentDue;

