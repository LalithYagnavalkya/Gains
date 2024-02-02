"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserBulkUploadSchema = zod_1.z.object({
    username: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.string(),
    lastPayOffDate: zod_1.z.date().optional(),
    validUpto: zod_1.z.date().optional(),
    joinedOn: zod_1.z.date(),
    customerSerialNumber: zod_1.z.string(),
    partnerId: zod_1.z.number(),
});
