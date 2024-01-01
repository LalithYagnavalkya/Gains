import { Request, Response } from "express";
const schedule = require('node-schedule');
import schedulerLog from "../models/scheduler.log.model";
import Membership, { IMembership } from "../models/membership.model";

export const runMembershipScheduler = async (req: Request, res: Response) => {


}

// const membershipScheduler = (): any => {
//     return []
// }


const memberShipJob = schedule.scheduleJob('0 0 * * *', async function () {
    let scheduler_id :string;
    try {
        let today = new Date();
        let todayStart = today.setHours(0, 0, 0, 0);
        let todayEnd = today.setHours(23, 59, 0, 0);

        let _scheduler = await schedulerLog.create({ type: 'MEMBERSHIP', status: 'In Progress', startDate: new Date() });
        scheduler_id = String(_scheduler._id)
        setTimeout(async () => {
            await membershipJobLogic(scheduler_id);
        }, 10000)

    } catch (error: any) {

    }

});

const membershipJobLogic = async (scheduler_id: string) => {
    try {
        const currentDate = new Date();
        const threeDaysInFuture = new Date(new Date().setDate(new Date().getDate() + 3));
        const memberShips = await Membership.find({
            validUpto: {
                $lte: threeDaysInFuture.setHours(23, 59, 0, 0),
            },
            paymentStatus: { $ne: 'PAST_DUE' },
        })

        memberShips.forEach(async (m: IMembership) => {
            if (m.validUpto < currentDate) {
                // validUpto is expired
                m.paymentStatus = 'PENDING';
            } else if (new Date(m.validUpto).setHours(23, 59, 0, 0) === threeDaysInFuture.getTime()) {
                m.paymentStatus = 'UPCOMMING';
            }
        })

    } catch (error) {
        await schedulerLog.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Failed', error });
    }
}

// membershipJobLogic();