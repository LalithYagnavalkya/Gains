"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const partnerSchema = new mongoose_1.default.Schema({
    partnerId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Partner = mongoose_1.default.model("partner", partnerSchema);
exports.default = Partner;
