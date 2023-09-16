import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import upload from '../middleware/multer.middleware'
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";

// controllers
import { uploadCustomers, addCustomer, editCustomer } from "../controllers/admin.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/uploadCustomers', authenticateUser, upload.single('csvdata'), uploadCustomers)

router.post('/addCustomer', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), addCustomer )

router.post('/editCustomer', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), editCustomer)



export default router;