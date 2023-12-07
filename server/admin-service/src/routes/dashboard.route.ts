import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { dashboardSchema } from "../schemas/dashboard.schema";

// controllers
import { getCounts, getRecentTransactions } from "../controllers/dashboard.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.get('/getCounts/', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(dashboardSchema), getCounts)

router.get('/getRecentTransactions/', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(dashboardSchema), getRecentTransactions)


export default router;