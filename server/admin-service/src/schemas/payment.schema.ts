import { TypeOf, array, number, object, string, z } from "zod";
import { Types } from 'mongoose';

const isObjectId = (value: string): boolean => {
    return Types.ObjectId.isValid(value);
};

export const updatMembershipSchema = object({
    params: object({
        userId: string({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
    body: object({
        membershipFee: number({ required_error: 'please provide membership fee' }),
        validUpto: z.string(),
        _user: object({
            _id: z.string(),
            role: string(),
            partnerId: z.number(),
        })

    })
})

export type updatMembershipInput = TypeOf<typeof updatMembershipSchema>;