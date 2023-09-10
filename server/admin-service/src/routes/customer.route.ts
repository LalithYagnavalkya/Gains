import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import upload from '../middleware/multer.middleware'

// controllers
import { uploadCustomers } from "../controllers/customer.controller";
import { authenticateUser } from "../middleware/auth.middleware";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/uploadCustomers', authenticateUser, upload.single('csvdata'), uploadCustomers)



export default router;