"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const classificationModel = new mongoose_1.default.Schema({
    type: { type: String },
    key: { type: String },
    value: { type: String },
    label: { type: String },
    order: { type: Number },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
const Classification = mongoose_1.default.model("classification", classificationModel);
exports.default = Classification;
