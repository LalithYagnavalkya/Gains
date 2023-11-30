import { Router } from "express";
import dotenv from "dotenv";

// middlewares
import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";
import validateResource from "../middleware/validateResource";

// schemas
import { updatMembershipSchema } from "../schemas/payment.schema";

// controllers
import { updateMembership } from "../controllers/payment.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.post('/updateMembership/:userId', authenticateUser, authorizeRole(['SUPER_ADMIN', 'ADMIN']), validateResource(updatMembershipSchema), updateMembership)


export default router;