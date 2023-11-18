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
    params: object({
        token: string(),
    }),
    body: object({
        password: string({
            required_error: "password",
        }).min(6, "password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required",
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "passwords do not match",
        path: ["passwordConfirmation"],
    })
});


export type loginInput = TypeOf<typeof loginSchema>
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>
export type resetPassowrdInput = TypeOf<typeof resetPassowrdSchema>