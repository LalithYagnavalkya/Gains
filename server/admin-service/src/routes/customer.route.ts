import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import upload from '../middleware/multer.middleware'
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { addCustomerSchema, editCustomerSchema, getCustomersSchema, emailOrPhoneSchema } from "../schemas/customer.schema";

// controllers
import { uploadCustomers, addCustomer, editCustomer, getCustomers, checkIfEmailOrPhoneExists } from "../controllers/customer.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/uploadCustomers', authenticateUser, upload.single('csvdata'), uploadCustomers)

router.post('/addCustomer', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(addCustomerSchema), addCustomer)

router.post('/editCustomer/:userId', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(editCustomerSchema), editCustomer)

// validation input in the api for query params
router.get('/getCustomers', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), getCustomers)

router.get('/checkIfEmailOrPhoneExists', validateResource(emailOrPhoneSchema), checkIfEmailOrPhoneExists)


export default router;