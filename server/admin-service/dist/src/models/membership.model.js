"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const membershipSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    lastPaymentTransactionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Transaction' },
    paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'UPCOMMING', 'PAST_DUE'], default: 'PENDING' },
    membershipFee: { type: Number, required: true },
    membershipDuriation: { type: Number, required: true },
    lastPaymentDate: { type: Date },
    // Assume user is in middle of the month October 15th, and user next payment is on november 1st.
    // user payment status will be paid for october month. 
    // On October 23rd, seven days before the validUpto. user paymentStatus will become UPCOMMING
    // if user did not pay on 1st, paymentStatus will be PENDING.
    active: { type: Boolean, required: true, default: true },
    validUpto: { type: Date, required: true },
    partnerId: { type: Number, required: true }
}, { timestamps: true });
const Membership = mongoose_1.default.model("Membership", membershipSchema);
exports.default = Membership;
