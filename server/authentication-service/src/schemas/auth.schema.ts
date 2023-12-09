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

export const resetPassowrdSchema = object({
    body: object({
        password: string({
            required_error: "password",
        }).min(8, { message: 'Password must be at least 8 characters long' })
            .max(20, { message: 'Password must not exceed 20 characters' })
            .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password), {
                message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
            }),
        confirmPassword: string({
            required_error: "passwordConfirmation is required",
        }),
        token: string({
            required_error: 'required Info'
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: "passwords do not match",
        path: ["passwordConfirmation"],
    })
});


export type loginInput = TypeOf<typeof loginSchema>
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>
export type resetPassowrdInput = TypeOf<typeof resetPassowrdSchema>