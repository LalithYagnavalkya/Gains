import { z } from "zod";

const UserBulkUploadSchema = z.object({
    username: z.string(),
    mobile: z.string().optional(),
    role: z.string(),
    joinedOn: z.date().optional(),
});

export type UserBulkUpload = z.infer<typeof UserBulkUploadSchema>;