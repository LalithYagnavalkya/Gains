import { TypeOf, object, string, z } from "zod";

export const bulkUploadSchema = z.array(
    z.object({
        name: z.string(),
        joinedon: z.date(),
        phone: z.string(),
        id: z.string(),
    })
);

export type bulkUploadInput = TypeOf<typeof bulkUploadSchema>