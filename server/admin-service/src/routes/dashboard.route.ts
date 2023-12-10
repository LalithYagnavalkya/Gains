import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { dashboardSchema } from "../schemas/dashboard.schema";

// controllers
import { dashboardCustomerStats, fetchDashboardTransactionsData } from "../controllers/dashboard.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.get('/dashboardCustomerStats', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(dashboardSchema), dashboardCustomerStats)

router.get('/fetchDashboardTransactionsData', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(dashboardSchema), fetchDashboardTransactionsData)


export default router;