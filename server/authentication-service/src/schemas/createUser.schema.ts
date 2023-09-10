import { boolean, object, string, TypeOf } from "zod";

export const createAdminSchema = object({
    body: object({
        username: string({
            required_error: "username is required",
        }),
        password: string({
            required_error: "password is required",
        }).min(6, "password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required",
        }),
        email: string({
            required_error: "username is required",
        }).email("Not a valid email"),
        phone: string({
            required_error: "username is required",
        }).length(10, "Not a valid phone number"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export type createAdminInput = TypeOf<typeof createAdminSchema>