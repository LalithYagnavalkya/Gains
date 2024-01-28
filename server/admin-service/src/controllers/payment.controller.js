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
exports.updateMembership = void 0;
//models 
const membership_model_1 = __importDefault(require("../models/membership.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
//services
const updateMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { membershipFee, validUpto, _user } = req.body;
        const userMembership = yield membership_model_1.default.findOne({
            userId: userId,
        });
        if (!userMembership) {
            return res.status(400).json({ error: true, message: 'Invalid user id' });
        }
        const previousValidUpto = new Date(userMembership.validUpto);
        const validUptoDate = new Date(validUpto);
        const diffMonths = (validUptoDate.getFullYear() - previousValidUpto.getFullYear()) * 12 + (validUptoDate.getMonth() - previousValidUpto.getMonth());
        userMembership.validUpto = validUptoDate;
        userMembership.membershipFee = membershipFee;
        userMembership.membershipDuriation = diffMonths;
        const transaction = yield transaction_model_1.default.create({
            userId,
            membershipId: userMembership === null || userMembership === void 0 ? void 0 : userMembership._id,
            paymentAmount: membershipFee,
            paymentType: 'CASH',
            partnerId: _user.partnerId,
            transactionType: 'CREDIT'
        });
        userMembership.lastPaymentDate = transaction.createdAt;
        userMembership.lastPaymentTransactionId = transaction._id;
        userMembership.paymentStatus = 'PAID';
        userMembership.save();
        return res.status(200).json({ error: false, message: 'Payment updated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: true, message: "Couldn't update the payment" });
    }
});
exports.updateMembership = updateMembership;
