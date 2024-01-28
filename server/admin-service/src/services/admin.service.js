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
exports.createCustomer = exports.editValidUpto = exports.editJoinedOn = exports.editWorkoutType = exports.editPhone = exports.editUsername = exports.editEmail = exports.insertIntoDB = void 0;
// models
const user_model_1 = __importDefault(require("../models/user.model"));
// services
const shared_controller_1 = require("../controllers/shared.controller");
const membership_model_1 = __importDefault(require("../models/membership.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const insertIntoDB = (users, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert keys to lowercase for each object in the array
        const convertedData = users.map((obj) => {
            const newObj = {};
            for (const key in obj) {
                newObj[key.toLowerCase()] = obj[key];
            }
            return newObj;
        });
        const listOfUsers = [];
        convertedData.map((user) => {
            const userObj = {
                username: user.username,
                phone: user.phone,
                lastPayOffDate: (0, shared_controller_1.parseDate)(user.startdate, 'dd-mm-yy'),
                validUpto: (0, shared_controller_1.parseDate)(user.enddate, 'dd-mm-yy'),
                joinedOn: new Date(),
                customerSerialNumber: user.slno,
                role: 'USER',
                partnerId: 1 // later take this from middleware
            };
            listOfUsers.push(userObj);
        });
        yield user_model_1.default.insertMany(listOfUsers);
        return res.status(200).json({ error: false, message: 'successfully inserted data' });
    }
    catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});
exports.insertIntoDB = insertIntoDB;
const editEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userId } = data;
        const user = yield user_model_1.default.findById(userId).select('email role');
        if (user && String(user === null || user === void 0 ? void 0 : user._id) === String(userId) && user.role === 'USER') {
            const isEmailTaken = yield user_model_1.default.findOne({ email }).select('email');
            if (isEmailTaken) {
                return Promise.resolve({ error: true, message: 'User with this email already exists' });
            }
            user.email = email;
            yield user.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editEmail = editEmail;
const editUsername = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, userId } = data;
        const user = yield user_model_1.default.findById(userId).select('username role');
        if (user && String(user === null || user === void 0 ? void 0 : user._id) === String(userId) && user.role === 'USER') {
            user.username = username;
            yield user.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editUsername = editUsername;
const editPhone = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, userId } = data;
        const user = yield user_model_1.default.findById(userId).select('phone role');
        if (user && String(user === null || user === void 0 ? void 0 : user._id) === String(userId) && user.role === 'USER') {
            const isPhoneTaken = yield user_model_1.default.findOne({ phone }).select('phone');
            if (isPhoneTaken) {
                return Promise.resolve({ error: true, message: 'User with this phone number already exists' });
            }
            user.phone = phone;
            yield user.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editPhone = editPhone;
const editWorkoutType = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workoutTypes, userId } = data;
        const user = yield user_model_1.default.findById(userId).select('workout role');
        if (user && String(user === null || user === void 0 ? void 0 : user._id) === String(userId) && user.role === 'USER') {
            const { error, message, updatedWorkoutTypes } = yield (0, shared_controller_1.parseWorkoutTypes)(workoutTypes);
            if (error) {
                return Promise.resolve({ error, message });
            }
            user.workoutType = updatedWorkoutTypes;
            yield user.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editWorkoutType = editWorkoutType;
const editJoinedOn = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { joinedOn, userId } = data;
        const parsedDate = new Date(joinedOn);
        if (isNaN(parsedDate.getTime())) {
            // invalid date
            return Promise.resolve({ error: true, message: 'Invalid Date' });
        }
        const user = yield user_model_1.default.findById(userId).select('joinedOn role');
        if (user && String(user === null || user === void 0 ? void 0 : user._id) === String(userId) && user.role === 'USER') {
            user.joinedOn = parsedDate;
            yield user.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editJoinedOn = editJoinedOn;
const editValidUpto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { validUpto, userId } = data;
        const parsedDate = new Date(validUpto);
        if (isNaN(parsedDate.getTime())) {
            // invalid date
            return Promise.resolve({ error: true, message: 'Invalid Date' });
        }
        const userData = yield membership_model_1.default.findById({ userId });
        if (userData) {
            userData.validUpto = parsedDate;
            yield userData.save();
            return Promise.resolve({ error: false, message: 'Updated sucessfuly' });
        }
        else {
            return Promise.resolve({ error: true, message: 'User not found' });
        }
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.editValidUpto = editValidUpto;
const createCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, phone, validUpto, joinedOn, gender, workoutType, membershipFee, _user } = data;
        const user = yield user_model_1.default.create({
            email,
            phone,
            username,
            joinedOn: new Date(joinedOn),
            gender,
            workoutType,
            partnerId: _user.partnerId
        });
        if (!user) {
            return Promise.resolve({ error: true, message: 'User was not created' });
        }
        const joinedOnDate = new Date(joinedOn);
        const validUptoDate = new Date(new Date(validUpto).setHours(23, 59, 0, 0));
        const diffMonths = (validUptoDate.getFullYear() - joinedOnDate.getFullYear()) * 12 + (validUptoDate.getMonth() - joinedOnDate.getMonth());
        const membershipObj = yield membership_model_1.default.create({
            userId: user._id,
            membershipFee,
            validUpto,
            membershipDuriation: diffMonths,
            partnerId: _user.partnerId,
            paymentStatus: 'PAID'
        });
        //create a transaction
        yield transaction_model_1.default.create({
            userId: user._id,
            membershipId: membershipObj._id,
            paymentAmount: membershipFee,
            paymentType: 'CASH',
            partnerId: _user.partnerId,
            transactionType: 'CREDIT'
        });
        return Promise.resolve({ error: false, message: 'Created sucessfully' });
    }
    catch (error) {
        return Promise.resolve({ error: true, message: error.message });
    }
});
exports.createCustomer = createCustomer;
