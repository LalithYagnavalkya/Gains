import { Request, Response } from "express";
const schedule = require('node-schedule');
import schedulerLog from "../models/scheduler.log.model";
import Membership from "../models/membership.model";

export const runMembershipScheduler = async (req: Request, res: Response) => {


}

// const membershipScheduler = (): any => {
//     return []
// }


// const memberShipJob = schedule.scheduleJob('0 0 * * *', async function () {
//     let scheduler_id;
//     try {
//         let today = new Date();
//         let todayStart = today.setHours(0, 0, 0, 0);
//         let todayEnd = today.setHours(23, 59, 0, 0);

//         const checkIfAnyPreviousProcess = await schedulerLog.findOne({
//             type: 'MEMBERSHIP', status: 'In Progress',
//             $and: [
//                 {
//                     startDate: { $lte: todayEnd }
//                 },
//                 {
//                     startDate: { $gte: todayStart }
//                 }
//             ]
//         });

//         if (checkIfAnyPreviousProcess) {
//             await schedulerLog.create({
//                 type: 'MEMBERSHIP',
//                 status: 'already runing',
//                 startTime: new Date(),
//             })
//             return 
//         }

//         scheduler_id = await schedulerLog.create({ type: 'MEMBERSHIP', status: 'In Progress', startDate: new Date() });

//         // await membershipJobLogic();

//     } catch (error: any) {

//     }

// });

const membershipJobLogic = async () => {
    try {
        const currentDate = new Date();
        Membership.updateMany({}, {validUpto: new Date})
        const memberShips = await Membership.find( {
            validUpto: {
                $lte: currentDate,
            },
            paymentStatus: { $ne: 'PAID' },
        })

        const x = memberShips.map(x => {
            x.paymentStatus = 'PENDING'
            return x.save();
        })

    } catch (error) {
        
    }
}

membershipJobLogic();