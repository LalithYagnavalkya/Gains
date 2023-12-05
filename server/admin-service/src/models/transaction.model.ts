import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Transaction document
interface ITransaction extends Document {
    userId: Schema.Types.ObjectId;
    paymentAmount: number;
    paymentType?: string;
    errorMessage?: string;
    errorStack?: Schema.Types.Mixed;
    createdAt: Date;
    updatedAt: Date;
    transactionType: string;
    partnerId: number;
}

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        membershipId: { type: Schema.Types.ObjectId, ref: 'Membership', required: true},
        paymentAmount: { type: Number, required: true },
        paymentType: {type: String, enum: ['CASH', 'ONLINE']},
        partnerId: {type: Number, required: true},
        transactionType: {type: String, enum: ['CREDIT', 'DEBIT']}
    },
    { timestamps: true },
);

// Create and export the Transaction model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
