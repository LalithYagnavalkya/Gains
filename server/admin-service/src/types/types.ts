import { z } from "zod";

const UserBulkUploadSchema = z.object({
    username: z.string(),
    phone: z.string().optional(),
    role: z.string(),
    lastPayOffDate: z.date().optional(),
    validUpto: z.date().optional(),
    joinedOn: z.date(),
    customerSerialNumber: z.string(),
    partnerId: z.number(),
});

export type UserBulkUpload = z.infer<typeof UserBulkUploadSchema>;