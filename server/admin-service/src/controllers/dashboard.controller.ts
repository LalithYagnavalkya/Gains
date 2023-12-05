import { Request, Response } from "express";

//models
import Transaction, { ITransaction } from "../models/transaction.model";

//schemas
import { dashbaordInput } from "../schemas/dashboard.schema";

export const getCounts = async (req: Request<{}, {}, dashbaordInput['body']>, res: Response) => {
    try {
        const { _user } = req.body;

        return res.status(200).json({ error: false, message: 'Payment updated successfully' })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Couldn't update the payment" })
    }
}


export const getRecentTransactions = async (req: Request<{}, {}, dashbaordInput['body']>, res: Response) => {
    try {

        const { _user } = req.body;

        // Get the current date
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const transactionFilter = {
            partnerId: _user.partnerId, 
            transactionType: 'CREDIT',
            $and: [
                { createdAt: { $gte: startOfMonth }},
                { createdAt: { $lte: endOfMonth }}
            ]
        }

        const transactions: ITransaction[] = await Transaction.find(transactionFilter).populate('userId', 'username email').sort({ createdAt: -1 }).lean();
        const totalTransactionCount: number = await Transaction.countDocuments(transactionFilter);

        const totalAmount = transactions.reduce((acc: number, tran: ITransaction) => {
            acc += tran.paymentAmount
            return acc
        }, 0)

        res.status(200).json({
            error: false,
            numberOfTransactionsCurrentMonth: transactions.length,
            totalRevenueCurrentMonth: totalAmount,
            transactions,
            totalTransactionsCurrrentMonth: totalTransactionCount,
        })
    } catch (error : any) {
        res.status(500).json({ error: true, message: error.message })
    }
}