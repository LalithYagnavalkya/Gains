import { TypeOf, array, number, object, string, z } from "zod";
import { Types } from 'mongoose';

const isObjectId = (value: string): boolean => {
    return Types.ObjectId.isValid(value);
};
const usernameRegex = /^[a-zA-Z0-9 _-]+$/;

export const editCustomerSchema = object({

    params: object({
        userId: string({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
    body: object({

        operationType: z.enum(["email", "username", "phone", "workoutType", "joinedOn", "validUpto"]).
            transform((val) => val.toLowerCase()),

        email: string()
            .email("Not a valid email").
            optional(),

        phone: string()
            .length(10, 'Phone number must be 10 digits')
            .optional(),

        username: string().optional(),

        joinedOn: z.string().optional(),

        validUpto: z.string().optional(),

        workoutTypes: array(string()).optional(),


    })
});

export const addOrEditEmailSchema = object({
    userId: string(),
    email: string({
        required_error: "email is required",
    }).email("Not a valid email"),
});

export const usernameSchema = object({
    userId: string(),
    username: string({
        required_error: "username is required",
    }).min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username cannot exceed 20 characters' })
        .regex(usernameRegex, { message: 'Username can only contain letters, numbers, underscores, and hyphens' })
});
export const phoneSchema = object({
    userId: string(),
    phone: string()
        .length(10, 'Phone number must be 10 digits')
});
export const workoutSchmea = object({
    userId: string(),
    workoutTypes: array(string()),
});

export const joinedOnSchema = object({
    userId: string(),
    joinedOn: string(),
});

export const validUptoSchema = object({
    userId: string(),
    validUpto: string(),
});

export const addCustomerSchema = object({

    body: object({
        email: string()
            .email("Not a valid email"),

        phone: string()
            .length(10, 'Phone number must be 10 digits'),

        username: string({
            required_error: "username is required",
        }).min(3, { message: 'Username must be at least 3 characters long' })
            .max(20, { message: 'Username cannot exceed 20 characters' })
            .regex(usernameRegex, { message: 'Username can only contain letters, numbers, underscores, and hyphens' }),

        joinedOn: z.string(),

        validUpto: z.string(),

        workoutType: array(string()).optional(),

        gender: z.string().optional(),

        membershipFee: z.number(),

        // middleware
        _user: object({
            _id: z.string(),
            role: string(),
            partnerId: z.number(),
        })

    })
});

export const getCustomersSchema = object({

    body: object({
        // middleware
        _user: object({
            _id: z.string(),
            role: string(),
            partnerId: z.number(),
        })
    }),
    query: object({

        page: string().transform((val) => Number(val)),

        type: z.enum(["recentlyJoined", "username", "phone", "workoutType", "joinedOn", "validUpto"]).
            transform((val) => val.toLowerCase()),

        usernameOrPhone: z.string().optional(),

        paymentStatus: z.union([
            z.enum(['PENDING', 'PAID', 'UPCOMING_PAYMENT_DUE']),
            z.array(z.enum(['PENDING', 'PAID', 'UPCOMING_PAYMENT_DUE'])),
        ]).transform((val) => {
            if (Array.isArray(val)) {
                return val.map((item) => item.toLowerCase());
            } else {
                return [val.toLowerCase()];
            }
        }).optional(),

        limit: string().transform((val) => Number(val)),

        partnerId: string().transform((val) => Number(val)).optional(),

    }),
});

export const getCustomerByIdSchema = object({
    params: object({
        userId: string({ required_error: 'please provide a user id' })
            .refine(isObjectId, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
})

export const getRecentCustomersSchema = object({
    query: object({

        page: number(),

    })
})

export const emailOrPhoneSchema = object({
    body: object({
        email: string({
            required_error: "email is required",
        }).optional(),
        phone: string()
            .length(10, 'Phone number must be 10 digits')
            .optional(),
    })
});


export type editCustomerInput = TypeOf<typeof editCustomerSchema>;
export type addEmailInput = TypeOf<typeof addOrEditEmailSchema>;
export type usernameInput = TypeOf<typeof usernameSchema>;
export type phoneInput = TypeOf<typeof phoneSchema>;
export type wroukoutTypeInput = TypeOf<typeof workoutSchmea>;
export type joinedOnInput = TypeOf<typeof joinedOnSchema>;
export type validUptoInput = TypeOf<typeof validUptoSchema>;
export type addCustomerInput = TypeOf<typeof addCustomerSchema>;
export type getCustomersInput = TypeOf<typeof getCustomersSchema>;
export type getCustomerByIdInput = TypeOf<typeof getCustomerByIdSchema>;
export type getRecentCustomersInput = TypeOf<typeof getRecentCustomersSchema>;
export type emailOrPhoneInput = TypeOf<typeof emailOrPhoneSchema>
