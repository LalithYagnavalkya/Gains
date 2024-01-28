"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyMetricsByIdSchema = exports.addBodyMetricsSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const isObjectId = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
exports.addBodyMetricsSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
        bodyMetrics: (0, zod_1.object)({
            height: zod_1.z.number(),
            weight: zod_1.z.number(),
            chest: zod_1.z.number(),
            bicep: zod_1.z.number(),
            forearms: zod_1.z.number(),
            thighs: zod_1.z.number(),
            calfs: zod_1.z.number(),
            glutes: zod_1.z.number(),
        }),
        date: zod_1.z.string(),
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    })
});
exports.getBodyMetricsByIdSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
    body: (0, zod_1.object)({
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    })
});
