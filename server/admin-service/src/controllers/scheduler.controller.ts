import { Request, Response } from "express";
const schedule = require('node-schedule');
import schedulerLog from "../models/scheduler.log.model";
import Membership, { IMembership } from "../models/membership.model";
import { format } from 'date-fns';
import { formatTimeTaken } from "./shared.controller";

export const runMembershipScheduler = async (req: Request, res: Response) => {
    memberShipJob.invoke();
    res.status(200).json({ error: false, message: 'Scheduler manually triggered' });
}

const memberShipJob = schedule.scheduleJob('0 0 * * *', async function () {
    let scheduler_id: string = '';
    try {
        let startTime = new Date();

        let _scheduler = await schedulerLog.create({ type: 'MEMBERSHIP', status: 'In Progress', startDate: startTime, startTime: format(startTime, 'yyyy-MM-dd hh:mm:ss a') });

        scheduler_id = String(_scheduler?._id)

        await membershipJobLogic(scheduler_id);
        const endTime = new Date();
        const timeTakenString = formatTimeTaken(startTime, endTime);
        await schedulerLog.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Completed', timeTaken: timeTakenString });

    } catch (error: any) {
        await schedulerLog.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Failed', errorMessage: error.message, errorStack: error.stack });
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

    } catch (error: any) {
        await schedulerLog.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Failed', errorMessage: error.message, errorStack: error.stack });
    }
}