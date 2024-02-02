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
exports.runMembershipScheduler = void 0;
const schedule = require('node-schedule');
const scheduler_log_model_1 = __importDefault(require("../models/scheduler.log.model"));
const membership_model_1 = __importDefault(require("../models/membership.model"));
const date_fns_1 = require("date-fns");
const shared_controller_1 = require("./shared.controller");
const runMembershipScheduler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    memberShipJob.invoke();
    res.status(200).json({ error: false, message: 'Scheduler manually triggered' });
});
exports.runMembershipScheduler = runMembershipScheduler;
const memberShipJob = schedule.scheduleJob('0 0 * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let scheduler_id = '';
        try {
            let startTime = new Date();
            let _scheduler = yield scheduler_log_model_1.default.create({ type: 'MEMBERSHIP', status: 'In Progress', startDate: startTime, startTime: (0, date_fns_1.format)(startTime, 'yyyy-MM-dd hh:mm:ss a') });
            scheduler_id = String(_scheduler === null || _scheduler === void 0 ? void 0 : _scheduler._id);
            yield membershipJobLogic(scheduler_id);
            const endTime = new Date();
            const timeTakenString = (0, shared_controller_1.formatTimeTaken)(startTime, endTime);
            yield scheduler_log_model_1.default.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Completed', endTime: (0, date_fns_1.format)(endTime, 'yyyy MMM dd hh:mm:ss a'), endDate: endTime, timeTaken: timeTakenString });
        }
        catch (error) {
            yield scheduler_log_model_1.default.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Failed', endTime: (0, date_fns_1.format)(new Date(), 'yyyy MMM dd hh:mm:ss a'), endDate: new Date(), errorMessage: error.message, errorStack: error.stack });
        }
    });
});
const membershipJobLogic = (scheduler_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const threeDaysInFuture = new Date(new Date().setDate(new Date().getDate() + 3));
        const memberShips = yield membership_model_1.default.find({
            validUpto: {
                $lte: threeDaysInFuture.setHours(23, 59, 0, 0),
            },
            paymentStatus: { $ne: 'PAST_DUE' },
        });
        memberShips.forEach((m) => __awaiter(void 0, void 0, void 0, function* () {
            if (m.validUpto < currentDate) {
                // validUpto is expired
                m.paymentStatus = 'PENDING';
            }
            else if (new Date(m.validUpto).setHours(23, 59, 0, 0) === threeDaysInFuture.getTime()) {
                m.paymentStatus = 'UPCOMMING';
            }
        }));
    }
    catch (error) {
        yield scheduler_log_model_1.default.findByIdAndUpdate({ _id: scheduler_id }, { status: 'Failed', endTime: (0, date_fns_1.format)(new Date(), 'yyyy MMM dd hh:mm:ss a'), endDate: new Date(), errorMessage: error.message, errorStack: error.stack });
    }
});
