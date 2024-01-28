"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String },
    refreshToken: { type: String },
    profilePic: { type: String },
    active: { type: Boolean, default: true },
    phone: { type: String, unique: true },
    googleId: { type: String },
    password: { type: String, select: false },
    role: {
        type: String,
        enum: ['ADMIN', 'SUPER_ADMIN', 'USER'],
        default: 'USER'
    },
    joinedOn: { type: Date },
    gender: { type: String, enum: ['MALE', 'FEMALE'] },
    isPhoneVerified: { type: Boolean, default: false, required: false },
    isEmailVerified: { type: Boolean, default: false, required: false },
    partnerId: { type: Number, required: true },
    workoutType: [{ type: String }],
    customerSerialNumber: { type: String },
    token: { type: String }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    // Convert the username to lowercase
    if (this.isModified("username")) {
        this.username = this.username.toLowerCase();
    }
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
