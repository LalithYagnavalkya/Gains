import { Request, Response } from "express";

import User from "../models/user.model";
import BodyMetrics from "../models/bodyMetrics.model";

import { addBodyMetricsInput, getBodyMetricsByIdInput } from "../schemas/bodymetrics.schema";
import { format } from "date-fns";

export const addBodyMetrics = async (req: Request<{}, {}, addBodyMetricsInput['body'], {}>, res: Response) => {
    // should add a new document in bodymetrics collection.
    try {
        const { userId, bodyMetrics, date, _user } = req.body;

        const BodyMetricFound = await BodyMetrics.findOne({ userId, date: format(new Date(date), 'MMM YYYY') });

        if (BodyMetricFound) {
            BodyMetricFound['height'] = bodyMetrics.height ?? null;
            BodyMetricFound['weight'] = bodyMetrics.weight ?? null;
            BodyMetricFound['chest'] = bodyMetrics.chest ?? null;
            BodyMetricFound['bicep'] = bodyMetrics.bicep ?? null;
            BodyMetricFound['forearms'] = bodyMetrics.forearms ?? null;
            BodyMetricFound['thighs'] = bodyMetrics.thighs ?? null;
            BodyMetricFound['calfs'] = bodyMetrics.calfs ?? null;
            BodyMetricFound['glutes'] = bodyMetrics.glutes ?? null;

            await BodyMetricFound.save();

            return res.status(200).json({ error: false, message: 'updated successfully' })
        }

        const bodyMetricsCreated = await BodyMetrics.create({
            date: new Date(date),
            height: bodyMetrics.height ?? null,
            weight: bodyMetrics.weight ?? null,
            chest: bodyMetrics.chest ?? null,
            bicep: bodyMetrics.bicep ?? null,
            forearms: bodyMetrics.forearms ?? null,
            thighs: bodyMetrics.thighs ?? null,
            calfs: bodyMetrics.calfs ?? null,
            glutes: bodyMetrics.glutes ?? null,
        })

        return res.status(201).json({ error: false, message: 'created successfully', bodyMetrics: bodyMetricsCreated })

    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' })
    }

}

export const getBodyMetrics = async (req: Request<getBodyMetricsByIdInput['params'], {}, getBodyMetricsByIdInput['body'], {}>, res: Response) => {
    try {
        const { userId } = req.params;

        const currentDate = new Date();
        const lastTwelveMonthsStartDate = new Date(currentDate);
        lastTwelveMonthsStartDate.setMonth(currentDate.getMonth() - 11);

        const bodyMetricFilter = {
            userId,
            startDate: {
                $gte: lastTwelveMonthsStartDate,
                $lte: currentDate,
            }
        };

        const userBodyMetrics = await BodyMetrics.find(bodyMetricFilter);

        return res.status(200).json(userBodyMetrics)

    } catch (error) {

    }
}