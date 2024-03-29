import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import upload from '../middleware/multer.middleware'
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { addCustomerSchema, editCustomerSchema, getCustomersSchema, emailOrPhoneSchema, getCustomerDetailsSchema } from "../schemas/customer.schema";

// controllers
import { uploadCustomers, addCustomer, updateCustomerDetails, getCustomers, checkIfEmailOrPhoneExists, getCustomerDetails } from "../controllers/customer.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/uploadCustomers', authenticateUser, upload.single('csvdata'), uploadCustomers)

router.post('/addCustomer', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(addCustomerSchema), addCustomer)

router.post('/updateCustomerDetails', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(editCustomerSchema), updateCustomerDetails)

// validation input in the api for query params
router.get('/getCustomers', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), getCustomers)

router.get('/getCustomerDetails/:userId', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(getCustomerDetailsSchema), getCustomerDetails)

router.post('/checkIfEmailOrPhoneExists', validateResource(emailOrPhoneSchema), checkIfEmailOrPhoneExists)

export default router;