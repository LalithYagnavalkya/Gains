import { TypeOf, array, number, object, string, z } from "zod";
import { Types } from 'mongoose';

const isObjectId = (value: string): boolean => {
    return Types.ObjectId.isValid(value);
};

export const addBodyMetricsSchema = object({
    body: object({
        userId: string({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
        bodyMetrics: object({
            height: z.number(),
            weight: z.number(),
            chest: z.number(),
            bicep: z.number(),
            forearms: z.number(),
            thighs: z.number(),
            calfs: z.number(),
            glutes: z.number(),
        }),
        date: z.string(),
        _user: object({
            _id: z.string(),
            role: string(),
            partnerId: z.number(),
        })

    })
})

export type addBodyMetricsInput = TypeOf<typeof addBodyMetricsSchema>;