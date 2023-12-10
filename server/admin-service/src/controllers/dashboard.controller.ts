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
    let graphData = [
        {
            month: 0,
            name: "Jan",
            total: 0,
        },
        {
            month: 1,
            name: "Feb",
            total: 0,
        },
        {
            month: 2,
            name: "Mar",
            total: 0,
        },
        {
            month: 3,
            name: "Apr",
            total: 0,
        },
        {
            month: 4,
            name: "May",
            total: 0,
        },
        {
            month: 5,
            name: "Jun",
            total: 0,
        },
        {
            month: 6,
            name: "Jul",
            total: 0,
        },
        {
            month: 7,
            name: "Aug",
            total: 0,
        },
        {
            month: 8,
            name: "Sep",
            total: 0,
        },
        {
            month: 9,
            name: "Oct",
            total: 0,
        },
        {
            month: 10,
            name: "Nov",
            total: 0,
        },
        {
            month: 11,
            name: "Dec",
            total: 0,
        },
    ]
    try {

        const { _user } = req.body;

        // Get the current date
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

        // transactionFilter for whole year
        const transactionFilter = {
            partnerId: _user.partnerId,
            transactionType: 'CREDIT',
            $and: [
                { createdAt: { $gte: startOfYear } },
                { createdAt: { $lte: currentDate } }
            ]
        }

        // transactionFilter for current month
        const transactionFilterMonth = {
            partnerId: _user.partnerId,
            transactionType: 'CREDIT',
            $and: [
                { createdAt: { $gte: startOfMonth } },
                { createdAt: { $lte: endOfMonth } }
            ]
        }

        // use pagination later
        const [transactions, totalTransactionsCurrrentMonthCount] = await Promise.all([
            Transaction.find(transactionFilter).populate('userId', 'username email').sort({ createdAt: -1 }).lean(),
            Transaction.countDocuments(transactionFilterMonth)
        ])

        const totalAmount = transactions.reduce((acc, tran: ITransaction) => {
            if (tran.createdAt?.getMonth() === currentDate.getMonth()  && tran.createdAt?.getDate() === currentDate.getDate()) {
                acc.totalCurrentDayRevenue += + tran.paymentAmount
            }
            if (tran.createdAt?.getMonth() === currentDate.getMonth()) {
                acc.totalCurrentMonthRevenue += tran.paymentAmount
            }
            let foundMonthData = graphData.find(item => item.month === tran.createdAt?.getMonth())
            if (foundMonthData){
                foundMonthData.total += tran.paymentAmount;
            }


            return acc
        }, { totalCurrentMonthRevenue: 0, totalCurrentDayRevenue: 0 })

        res.status(200).json({
            error: false,
            totalDayRevenue: totalAmount?.totalCurrentDayRevenue,
            todayMonthRevenue: totalAmount.totalCurrentMonthRevenue,
            totalTransactionsCurrrentMonthCount,
            transactions,
        })
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message })
    }
}


// const yearRevenueGraph = async (req: Request<{}, {}, dashbaordInput['body']>, res: Response) => {
//     const { _user } = req.body;

//     const currentDate = new Date();
//     const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
//     // End of the year
//     const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

//     // initalize graph data
//     let graphData = [
//         {
//             month: 0,
//             name: "Jan",
//             total: 0,
//         },
//         {
//             month: 1,
//             name: "Feb",
//             total: 0,
//         },
//         {
//             month: 2,
//             name: "Mar",
//             total: 0,
//         },
//         {
//             month: 3,
//             name: "Apr",
//             total: 0,
//         },
//         {
//             month: 4,
//             name: "May",
//             total: 0,
//         },
//         {
//             month: 5,
//             name: "Jun",
//             total: 0,
//         },
//         {
//             month: 6,
//             name: "Jul",
//             total: 0,
//         },
//         {
//             month: 7,
//             name: "Aug",
//             total: 0,
//         },
//         {
//             month: 8,
//             name: "Sep",
//             total: 0,
//         },
//         {
//             month: 9,
//             name: "Oct",
//             total: 0,
//         },
//         {
//             month: 10,
//             name: "Nov",
//             total: 0,
//         },
//         {
//             month: 11,
//             name: "Dec",
//             total: 0,
//         },
//     ]

//     const transactions = await
// }