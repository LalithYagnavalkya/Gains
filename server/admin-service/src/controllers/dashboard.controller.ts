import { Request, Response } from "express";

//models
import Transaction, { ITransaction } from "../models/transaction.model";

//schemas
import { dashbaordInput } from "../schemas/dashboard.schema";
import Membership from "../models/membership.model";

export const dashboardCustomerStats = async (req: Request<{}, {}, dashbaordInput['body']>, res: Response) => {
    try {
        const { _user } = req.body;

        const currentDate = new Date();

        // Last month's start date
        const lastMonthStartDate = new Date(currentDate);
        lastMonthStartDate.setMonth(currentDate.getMonth() - 1);
        lastMonthStartDate.setDate(1);

        // This month's start date
        const thisMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        const membershipFilter = {
            partnerId: _user.partnerId,
            $and: [
                { createdAt: { $gte: lastMonthStartDate } },
                { createdAt: { $lte: currentDate } }
            ]
        };

        const memberships = await Membership.find(membershipFilter).lean();

        const { upcomingCount, currentMonthCustomers, lastMonthCustomers } = memberships.reduce((acc, m) => {
            if (m.paymentStatus === 'UPCOMING') {
                acc.upcomingCount += 1;
            }
            if (m.createdAt.getMonth() === currentDate.getMonth()) {
                acc.currentMonthCustomers += 1;
            }
            if (m.createdAt.getMonth() === lastMonthStartDate.getMonth()) {
                acc.lastMonthCustomers += 1;
            }
            return acc;
        }, { upcomingCount: 0, currentMonthCustomers: 0, lastMonthCustomers: 0 });

        return res.status(200).json({ error: false, upcomingCount, currentMonthCustomers, lastMonthCustomers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Couldn't retrieve dashboard statistics" });
    }
};


export const fetchDashboardTransactionsData = async (req: Request<{}, {}, dashbaordInput['body']>, res: Response) => {
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

        // use pagination later
        const transactions = await Transaction.find(transactionFilter).populate('userId', 'username email').sort({ createdAt: -1 }).lean()


        const totalAmount = transactions.reduce((acc, tran: ITransaction) => {

            if (tran.createdAt?.getMonth() === currentDate.getMonth() && tran.createdAt?.getDate() === currentDate.getDate()) {
                acc.totalCurrentDayRevenue += + tran.paymentAmount;
            }
            if (tran.createdAt?.getMonth() === currentDate.getMonth()) {
                acc.totalCurrentMonthRevenue += tran.paymentAmount;
                acc.currentMonthCount += 1;
            }
            let foundMonthData = graphData.find(item => item.month === tran.createdAt?.getMonth())
            if (foundMonthData) {
                foundMonthData.total += tran.paymentAmount;
            }


            return acc;
        }, { totalCurrentMonthRevenue: 0, totalCurrentDayRevenue: 0, currentMonthCount: 0 })

        res.status(200).json({
            error: false,
            totalDayRevenue: totalAmount?.totalCurrentDayRevenue,
            todayMonthRevenue: totalAmount.totalCurrentMonthRevenue,
            currentMonthTransactionsCount: totalAmount.currentMonthCount,
            dashboardGraphData: graphData,
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