import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { addBodyMetricsSchema } from "../schemas/bodymetrics.schema";

// controllers
import { addBodyMetrics } from "../controllers/bodymetrics.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/addBodyMetrics', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(addBodyMetricsSchema), addBodyMetrics)


export default router;