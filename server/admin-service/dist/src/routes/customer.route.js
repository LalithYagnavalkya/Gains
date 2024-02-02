"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
// middlewares
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
// schemas
const customer_schema_1 = require("../schemas/customer.schema");
// controllers
const customer_controller_1 = require("../controllers/customer.controller");
dotenv_1.default.config({ path: "./src/config/config.env" });
const router = (0, express_1.Router)();
router.post('/uploadCustomers', auth_middleware_1.authenticateUser, multer_middleware_1.default.single('csvdata'), customer_controller_1.uploadCustomers);
router.post('/addCustomer', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), (0, validateResource_1.default)(customer_schema_1.addCustomerSchema), customer_controller_1.addCustomer);
router.post('/updateCustomerDetails', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), (0, validateResource_1.default)(customer_schema_1.editCustomerSchema), customer_controller_1.updateCustomerDetails);
// validation input in the api for query params
router.get('/getCustomers', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), customer_controller_1.getCustomers);
router.get('/getCustomerDetails/:userId', auth_middleware_1.authenticateUser, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), (0, validateResource_1.default)(customer_schema_1.getCustomerDetailsSchema), customer_controller_1.getCustomerDetails);
router.post('/checkIfEmailOrPhoneExists', (0, validateResource_1.default)(customer_schema_1.emailOrPhoneSchema), customer_controller_1.checkIfEmailOrPhoneExists);
exports.default = router;
