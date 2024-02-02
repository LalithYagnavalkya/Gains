"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailOrPhoneSchema = exports.getRecentCustomersSchema = exports.getCustomerDetailsSchema = exports.getCustomersSchema = exports.addCustomerSchema = exports.validUptoSchema = exports.joinedOnSchema = exports.workoutSchmea = exports.phoneSchema = exports.usernameSchema = exports.addOrEditEmailSchema = exports.editCustomerSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const isObjectId = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
const usernameRegex = /^[a-zA-Z0-9 _-]+$/;
exports.editCustomerSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        customerId: zod_1.z.string().optional(),
        operationType: zod_1.z.enum(["email", "username", "phone", "workoutType", "joinedOn", "validUpto"]).
            transform((val) => val.toLowerCase()).optional(),
        email: (0, zod_1.string)()
            .email("Not a valid email").
            optional(),
        phone: (0, zod_1.string)()
            .length(10, 'Phone number must be 10 digits')
            .optional(),
        username: (0, zod_1.string)().optional(),
        joinedOn: zod_1.z.string().optional(),
        validUpto: zod_1.z.string().optional(),
        workoutTypes: (0, zod_1.array)((0, zod_1.string)()).optional(),
    })
});
exports.addOrEditEmailSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    email: (0, zod_1.string)({
        required_error: "email is required",
    }).email("Not a valid email"),
});
exports.usernameSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    username: (0, zod_1.string)({
        required_error: "username is required",
    }).min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username cannot exceed 20 characters' })
        .regex(usernameRegex, { message: 'Username can only contain letters, numbers, underscores, and hyphens' })
});
exports.phoneSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    phone: (0, zod_1.string)()
        .length(10, 'Phone number must be 10 digits')
});
exports.workoutSchmea = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    workoutTypes: (0, zod_1.array)((0, zod_1.string)()),
});
exports.joinedOnSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    joinedOn: (0, zod_1.string)(),
});
exports.validUptoSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)(),
    validUpto: (0, zod_1.string)(),
});
exports.addCustomerSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)()
            .email("Not a valid email"),
        phone: (0, zod_1.string)()
            .length(10, 'Phone number must be 10 digits'),
        username: (0, zod_1.string)({
            required_error: "username is required",
        }).min(3, { message: 'Username must be at least 3 characters long' })
            .max(20, { message: 'Username cannot exceed 20 characters' })
            .regex(usernameRegex, { message: 'Username can only contain letters, numbers, underscores, and hyphens' }),
        joinedOn: zod_1.z.string(),
        validUpto: zod_1.z.string(),
        workoutType: (0, zod_1.array)((0, zod_1.string)()).optional(),
        gender: zod_1.z.string().optional(),
        membershipFee: zod_1.z.number(),
        // middleware
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    })
});
exports.getCustomersSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        // middleware
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    }),
    query: (0, zod_1.object)({
        page: (0, zod_1.string)().transform((val) => Number(val)),
        type: zod_1.z.enum(["recentlyJoined", "username", "phone", "workoutType", "joinedOn", "validUpto"]).
            transform((val) => val.toLowerCase()),
        usernameOrPhone: zod_1.z.string().optional(),
        paymentStatus: zod_1.z.union([
            zod_1.z.enum(['PENDING', 'PAID', 'UPCOMING_PAYMENT_DUE']),
            zod_1.z.array(zod_1.z.enum(['PENDING', 'PAID', 'UPCOMING_PAYMENT_DUE'])),
        ]).transform((val) => {
            if (Array.isArray(val)) {
                return val.map((item) => item.toLowerCase());
            }
            else {
                return [val.toLowerCase()];
            }
        }).optional(),
        limit: (0, zod_1.string)().transform((val) => Number(val)),
        partnerId: (0, zod_1.string)().transform((val) => Number(val)).optional(),
    }),
});
exports.getCustomerDetailsSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'please provide a user id' })
            .refine((value) => {
            console.log('Validating userId:', value);
            return isObjectId(value);
        }, { message: 'Invalid userId, must be a valid ObjectId' }),
    }),
});
exports.getRecentCustomersSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        page: (0, zod_1.number)(),
    })
});
exports.emailOrPhoneSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "email is required",
        }).optional(),
        phone: (0, zod_1.string)()
            .length(10, 'Phone number must be 10 digits')
            .optional(),
    })
});
