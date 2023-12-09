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
        const today = new Date().getDate();

        const transactionFilter = {
            partnerId: _user.partnerId, 
            transactionType: 'CREDIT',
            $and: [
                { createdAt: { $gte: startOfMonth }},
                { createdAt: { $lte: endOfMonth }}
            ]
        }

        // use pagination later
        const [transactions, totalTransactionCount] = await Promise.all([
            Transaction.find(transactionFilter).populate('userId', 'username email').sort({ createdAt: -1 }).lean(),
            Transaction.countDocuments(transactionFilter)
        ])

        const totalAmount = transactions.reduce((acc, tran: ITransaction) => {
            if (tran.createdAt?.getDate() === today){
                acc.todayAmount = acc.todayAmount + tran.paymentAmount
            }
            acc.totalAmount += tran.paymentAmount
            return acc
        }, {totalAmount: 0, todayAmount: 0})

        res.status(200).json({
            error: false,
            totalRevenueCurrentMonth: totalAmount?.totalAmount,
            todayRevenue: totalAmount.todayAmount,
            transactions,
            totalTransactionsCurrrentMonthCount: totalTransactionCount,
        })
    } catch (error : any) {
        res.status(500).json({ error: true, message: error.message })
    }
}
