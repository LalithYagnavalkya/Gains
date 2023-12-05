import { TypeOf, array, number, object, string, z } from "zod";
import { Types } from 'mongoose';

const isObjectId = (value: string): boolean => {
    return Types.ObjectId.isValid(value);
};

export const dashboardSchema = object({

    body: object({
        _user: object({
            _id: z.string(),
            role: string(),
            partnerId: z.number(),
        })

    })
})

export type dashbaordInput = TypeOf<typeof dashboardSchema>;