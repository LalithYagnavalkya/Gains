import { Request, Response } from "express";
const schedule = require('node-schedule');
import schedulerLog from "../models/scheduler.log.model";
import Membership, { IMembership } from "../models/membership.model";
import { format } from 'date-fns';

export const runMembershipScheduler = async (req: Request, res: Response) => {
    memberShipJob.invoke();
    res.send('Scheduler manually triggered');
}

// const membershipScheduler = (): any => {
//     return []
// }


const memberShipJob = schedule.scheduleJob('0 0 * * *', async function () {
    let scheduler_id: string;
    try {
        let today = new Date();

        let _scheduler = await schedulerLog.create({ type: 'MEMBERSHIP', status: 'In Progress', startDate: today, startTime: format(today, 'yyyy-MM-dd hh:mm:ss a') });

        scheduler_id = String(_scheduler._id)
        setTimeout(async () => {
            await membershipJobLogic(scheduler_id);
        }, 10000)

        today.getTime()
        await schedulerLog.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Completed' });

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