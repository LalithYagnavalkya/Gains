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
const bodymetrics_schema_1 = require("../schemas/bodymetrics.schema");
// controllers
const bodymetrics_controller_1 = require("../controllers/bodymetrics.controller");
dotenv_1.default.config({ path: "./src/config/config.env" });
const router = (0, express_1.Router)();
router.post('/addBodyMetrics', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), (0, validateResource_1.default)(bodymetrics_schema_1.addBodyMetricsSchema), bodymetrics_controller_1.addBodyMetrics);
exports.default = router;
