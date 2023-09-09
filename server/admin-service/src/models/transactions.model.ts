import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Transaction document
interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    paymentAmount: number;
    paymentType?: string;
}

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        paymentAmount: { type: Number, required: true },
        paymentType: {type: String, enum: ['CASH', 'ONLINE']}
    },
    { timestamps: true },
);

// Create and export the Transaction model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
