"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
//middlewares
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
//schemas
const auth_schema_1 = require("../schemas/auth.schema");
// controllers
const auth_controller_1 = require("../controllers/auth.controller");
dotenv_1.default.config({ path: "./src/config/config.env" });
const router = (0, express_1.Router)();
router.post("/login", (0, validateResource_1.default)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/forgotpassword", (0, validateResource_1.default)(auth_schema_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
router.post('/resetpassword', (0, validateResource_1.default)(auth_schema_1.resetPassowrdSchema), auth_controller_1.resetPassword);
exports.default = router;
