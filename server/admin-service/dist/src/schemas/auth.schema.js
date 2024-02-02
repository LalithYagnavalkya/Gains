"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassowrdSchema = exports.forgotPasswordSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "email is required",
        }).email("Not a valid email"),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }),
    })
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "email is required",
        }).email("Not a valid email"),
    })
});
exports.resetPassowrdSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "password",
        }).min(8, { message: 'Password must be at least 8 characters long' })
            .max(20, { message: 'Password must not exceed 20 characters' })
            .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password), {
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
        }),
        confirmPassword: (0, zod_1.string)({
            required_error: "passwordConfirmation is required",
        }),
        token: (0, zod_1.string)({
            required_error: 'required Info'
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: "passwords do not match",
        path: ["passwordConfirmation"],
    })
});
