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
exports.logout = exports.resetPassword = exports.forgotPassword = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
//models
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_middleware_1 = require("../middleware/auth.middleware");
dotenv_1.default.config({ path: "./src/config/config.env" });
const mailer_1 = __importDefault(require("../utils/mailer"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield user_model_1.default.findOne({ email: email }).select('username email password profilePic role');
        if (!user || user.active === false) {
            return res.status(401).json({ error: true, message: "Wrong credentials" });
        }
        if (user.password) {
            const isUser = yield bcrypt_1.default.compare(password, user.password);
            if (!isUser) {
                return res.status(401).json({ error: true, message: "Wrong credentials" });
            }
        }
        //generate token
        let token = (0, auth_middleware_1.generateToken)(user._id, null);
        const userObj = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
        };
        return res.status(200).json({ error: false, message: "Login successful", user: userObj, token });
    }
    catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = "👀 If the provided email is registered with Gains, you will receive a password reset email";
    const { email, } = req.body;
    try {
        let user = yield user_model_1.default.findOne({ email }).select('email');
        if (!user || user.active === false) {
            return res.send(message);
        }
        const token = (0, auth_middleware_1.generateToken)(user._id, '15m');
        user.token = token;
        user.save();
        yield (0, mailer_1.default)({
            to: user.email,
            from: "Gains",
            subject: "Reset your password",
            html: `
        <div style="background-color: #000000; color: #FAFAFA; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
            <h2 style="color: #FAFAFA; font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">Reset Your Password</h2>
            <p style="color: #A3A3A4; margin-bottom: 20px;">To reset your password, click on the following link:</p>
            <a href="${process.env.WEBAPP_ADDRESS}/resetpassword?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #000000; color: #FFFFFF; text-decoration: none; border: 1px solid #1B1B1D; border-radius: 5px; transition: background-color 0.3s, color 0.3s;">Reset Password</a>
            </div>
            `,
        });
        return res.status(200).json({ error: false, message });
    }
    catch (error) {
        return res.status(500).json({ error: true, message: 'Something went wrong!' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, token, confirmPassword } = req.body;
    const message = 'Could not reset password';
    try {
        if (password !== confirmPassword) {
            return res.status(404).json({ error: true, message: 'Passwords dont match.' });
        }
        const decoded = (0, auth_middleware_1.verifyToken)(token);
        const user = yield user_model_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.userId).select('password token');
        if (!user) {
            return res.status(400).json({ error: true, message: 'user not found' });
        }
        if (user.token !== token) {
            return res.status(401).json({ error: true, message: 'Token Expired!' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
        //update password
        user.password = hashedPassword;
        // override the token with empty string
        user.token = "";
        user.save();
        return res.status(200).json({ error: false, message: '🎉 Updated Password Successfully!' });
    }
    catch (e) {
        return res.status(500).send(message);
    }
});
exports.resetPassword = resetPassword;
const logout = (req, res) => {
    try {
        // remove cookies and logout
        return res.status(200).json({ error: false, message: 'logout successfully' });
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.logout = logout;
