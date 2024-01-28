"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bodyMetricSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    height: { type: Number },
    weight: { type: Number },
    chest: { type: Number },
    bicep: { type: Number },
    forearms: { type: Number },
    thighs: { type: Number },
    calfs: { type: Number },
    glutes: { type: Number },
}, { timestamps: true });
const BodyMetrics = mongoose_1.default.model("bodyMetric", bodyMetricSchema);
exports.default = BodyMetrics;
