"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const scheduler_controller_1 = require("../controllers/scheduler.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
dotenv_1.default.config({ path: "./src/config/config.env" });
const router = (0, express_1.Router)();
router.post('/runMembershipScheudler', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN']), scheduler_controller_1.runMembershipScheduler);
exports.default = router;
