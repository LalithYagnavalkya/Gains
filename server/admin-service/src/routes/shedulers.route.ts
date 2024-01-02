import { Router } from "express";
import dotenv from "dotenv";
import { runMembershipScheduler } from "../controllers/scheduler.controller";
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/runMembershipScheudler', authenticateUser, authorizeRole(['SUPER_ADMIN']), runMembershipScheduler);

export default router;
