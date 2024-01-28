"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatMembershipSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const isObjectId = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
exports.updatMembershipSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
    body: (0, zod_1.object)({
        membershipFee: (0, zod_1.number)({ required_error: 'please provide membership fee' }),
        validUpto: zod_1.z.string(),
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    })
});
