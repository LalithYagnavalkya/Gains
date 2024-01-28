"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEmailOrPhoneExists = exports.getCustomerDetails = exports.getCustomers = exports.updateCustomerDetails = exports.addCustomer = exports.uploadCustomers = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const logger_1 = __importDefault(require("../utils/logger"));
// models
const user_model_1 = __importDefault(require("../models/user.model"));
// schemas
const customer_schema_1 = require("../schemas/customer.schema");
const membership_model_1 = __importDefault(require("../models/membership.model"));
// services
const admin_service_1 = require("../services/admin.service");
const shared_controller_1 = require("./shared.controller");
const uploadCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let users = [];
        if (String((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path)) {
            fs_1.default.createReadStream(String((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path))
                .pipe((0, csv_parser_1.default)({}))
                .on('data', (data) => users.push(data))
                .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                // log.info(users)
                yield (0, admin_service_1.insertIntoDB)(users, req, res);
            }));
        }
        else {
            logger_1.default.error('Error in upload Customers');
            return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" });
        }
    }
    catch (error) {
        logger_1.default.error('Error in upload Customers');
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" });
    }
});
exports.uploadCustomers = uploadCustomers;
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, } = req.body;
        const userExists = yield user_model_1.default.findOne({
            $or: [{ email }, { phone }]
        });
        if (userExists) {
            return res.status(409).json({ error: true, message: "A user with this email or phone already exists" });
        }
        const { error, message } = yield (0, admin_service_1.createCustomer)(req.body);
        if (error) {
            return res.status(409).json({ error: true, message });
        }
        return res.status(201).json({ error, message });
    }
    catch (error) {
        return Promise.resolve({ error: true, message: 'something went wrong' });
    }
});
exports.addCustomer = addCustomer;
const updateCustomerDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { operationType, customerId } = req.body;
    try {
        // switch (operationType) {
        //     case 'email': {
        //         const parsedData = addOrEditEmailSchema.safeParse({ userId: customerId, email: req.body.email })
        //         if (parsedData.success) {
        //             const { email } = parsedData.data;
        //             const { error, message } = await editEmail({ email, customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: 'Please provide valid email' })
        //         break;
        //     }
        //     case 'username': {
        //         const parsedData = usernameSchema.safeParse({ userId: customerId, username: req.body.username })
        //         if (parsedData.success) {
        //             const { username } = parsedData.data;
        //             const { error, message } = await editUsername({ username, userId: customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Provide username' })
        //         break;
        //     }
        //     case 'phone': {
        //         const parsedData = phoneSchema.safeParse({ userId: customerId, phone: req.body.phone })
        //         if (parsedData.success) {
        //             const { phone } = parsedData.data;
        //             const { error, message } = await editPhone({ phone, userId: customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid phone number' })
        //         break;
        //     }
        //     case 'workoutType': {
        //         const parsedData = workoutSchmea.safeParse({ userId: customerId, workoutTypes: req.body.workoutTypes })
        //         if (parsedData.success) {
        //             const { workoutTypes } = parsedData.data;
        //             const { error, message } = await editWorkoutType({ workoutTypes, userId: customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid workoutType ' })
        //         break;
        //     }
        //     case 'joinedOn': {
        //         const parsedData = joinedOnSchema.safeParse({ userId: customerId, joinedOn: req.body.joinedOn })
        //         if (parsedData.success) {
        //             const { joinedOn } = parsedData.data;
        //             const { error, message } = await editJoinedOn({ joinedOn, userId: customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid joinedOn Date ' })
        //         break;
        //     }
        //     case 'validUpto':
        //         const parsedData = validUptoSchema.safeParse({ userId: customerId, validUpto: req.body.validUpto })
        //         if (parsedData.success) {
        //             const { validUpto } = parsedData.data;
        //             const { error, message } = await editValidUpto({ validUpto, userId: customerId });
        //             if (error) {
        //                 return res.status(409).json({ error, message })
        //             }
        //             return res.status(200).json({ error, message })
        //         }
        //         return res.status(400).json({ error: true, message: parsedData.error.message ?? 'Invalid validupto Date ' })
        //         break;
        //     default:
        //         break;
        // }
    }
    catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});
exports.updateCustomerDetails = updateCustomerDetails;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // couldn't figure how to use query without getting overloaded error in routes file
        // so using this instead for get apis 
        // validating input
        const reqInput = customer_schema_1.getCustomersSchema.parse({ body: req.body, query: req.query });
        const { page, type, limit, partnerId, paymentStatus, usernameOrPhone } = reqInput.query;
        const { _user } = reqInput.body;
        let _partnerId = _user.partnerId;
        const _paymentStatuses = ['PENDING, PAID, UPCOMMING'];
        if (_user.role === 'SUPER_ADMIN' && partnerId) {
            _partnerId = partnerId;
        }
        const resObj = {
            users: [],
            totalCount: 0,
        };
        const query = {
            partnerId: _partnerId,
            role: 'USER',
            active: true,
        };
        if (paymentStatus) {
            query.paymentStatus = { '$in': paymentStatus };
        }
        if (usernameOrPhone) {
            query['$or'] = [{ username: { $regex: usernameOrPhone } }, { phone: { $regex: usernameOrPhone } }];
        }
        switch (type) {
            case 'recentlyjoined':
                {
                    const { totalCount, data: users } = yield (0, shared_controller_1.paginateResults)(user_model_1.default, query, page, limit, 'createdAt', -1, '');
                    const memberships = yield membership_model_1.default.find({ userId: users.map(x => x._id) }).lean();
                    const usersData = [];
                    users.forEach((user, index) => {
                        const currentUserMembership = memberships.find(m => String(m.userId) === String(user._id));
                        usersData[index] = user;
                        if (currentUserMembership) {
                            usersData[index]['membershipFee'] = currentUserMembership === null || currentUserMembership === void 0 ? void 0 : currentUserMembership.membershipFee;
                            usersData[index]['paymentStatus'] = currentUserMembership === null || currentUserMembership === void 0 ? void 0 : currentUserMembership.paymentStatus;
                            usersData[index]['validUpto'] = currentUserMembership === null || currentUserMembership === void 0 ? void 0 : currentUserMembership.validUpto;
                        }
                    });
                    resObj['users'] = users !== null && users !== void 0 ? users : [];
                    resObj['totalCount'] = totalCount !== null && totalCount !== void 0 ? totalCount : [];
                }
                break;
            case 'recentlypaid': {
                const { totalCount, data } = yield (0, shared_controller_1.paginateResults)(user_model_1.default, query, page, limit, 'lastPayOffDate', -1, '');
                resObj['users'] = data !== null && data !== void 0 ? data : [];
                resObj['totalCount'] = totalCount !== null && totalCount !== void 0 ? totalCount : [];
                break;
            }
            default:
                break;
        }
        return res.status(200).json(Object.assign({ error: false, token: req.body.token }, resObj));
    }
    catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).send(error.errors);
        }
        return res.status(500).json({ error: true, message: error.message });
    }
});
exports.getCustomers = getCustomers;
const getCustomerDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { _user } = req.body;
        let resObj = {};
        const [user, membership] = yield Promise.all([
            user_model_1.default.findById(userId).lean(),
            membership_model_1.default.findOne({ userId }).lean()
        ]);
        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found!' });
        }
        resObj = user;
        resObj['membershipDetails'] = membership;
        return res.status(200).json({
            error: false,
            token: req.body.token,
            data: resObj
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ZodError') {
            return res.status(400).send(error.errors);
        }
        return res.status(500).json({ error: true, message: error.message });
    }
});
exports.getCustomerDetails = getCustomerDetails;
const checkIfEmailOrPhoneExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = req.body;
    try {
        const isFound = yield user_model_1.default.findOne({ $or: [{ email: email ? email : "" }, { phone: phone ? phone : "" }] }).lean();
        if (isFound) {
            return res.status(409).json({ error: true, message: 'Email Already Exists' });
        }
        return res.status(200).json({ error: false, message: 'Good to go!' });
    }
    catch (e) {
        return res.status(500).json({ error: true, message: e.message });
    }
});
exports.checkIfEmailOrPhoneExists = checkIfEmailOrPhoneExists;
