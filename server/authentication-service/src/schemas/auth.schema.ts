import { TypeOf, object, string } from "zod";

export const loginSchema = object({
    body: object({
        email: string({
            required_error: "email is required",
        }).email("Not a valid email"),
        password: string({
            required_error: "password is required",
        }),
    })
});

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "email is required",
        }).email("Not a valid email"),
    })
});

export type loginInput = TypeOf<typeof loginSchema>
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>