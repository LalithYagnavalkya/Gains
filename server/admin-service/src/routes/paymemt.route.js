"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
// middlewares
const auth_middleware_1 = require("../middleware/auth.middleware");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
// schemas
const payment_schema_1 = require("../schemas/payment.schema");
// controllers
const payment_controller_1 = require("../controllers/payment.controller");
dotenv_1.default.config({ path: "./src/config/config.env" });
const router = (0, express_1.Router)();
router.post('/updateMembership/:userId', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), (0, validateResource_1.default)(payment_schema_1.updatMembershipSchema), payment_controller_1.updateMembership);
exports.default = router;
