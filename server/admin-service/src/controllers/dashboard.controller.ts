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
    // {
    //     name,
    //     timestamp,
    //     amount,
    //     total transactions this month,
    //     sum of all transactions.
    // }
    const { _user } = req.body;
    const transactions: ITransaction[] = await Transaction.find({partnerId: _user.partnerId, transactionType: 'CREDIT'}).populate('userId');

    

    
}