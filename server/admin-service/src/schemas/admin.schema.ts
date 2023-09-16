import { TypeOf, object, string, z } from "zod";
import Classification from "../models/classification.model";

export const editCustomerInput = object({
    body: object({
        
        operationType: z.enum(["email", "phone", "workoutType", "joinedOn", "validUpto"]).
            transform((val) => val.toLowerCase()),

        email: string()
            .email("Not a valid email").
            optional(),

        phone: string()
            .length(10, 'Phone number must be 10 digits')
            .optional(),

        username: string().optional(),

        joinedOn: z.date().optional(),
        
        validUpto: z.date().optional(),
        
        workoutType: string().optional(),


    })
});

export const addOrEditEmail = object({
    body: object({
        email: string({
            required_error: "email is required",
        }).email("Not a valid email"),
        password: string({
            required_error: "password is required",
        }),
    })
});

export type bulkUploadInput = TypeOf<typeof addOrEditEmail>