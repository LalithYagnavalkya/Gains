import { Request, Response, NextFunction, Router } from "express"; 

import superAdminRoutes from './superAdmin.route'
import authRoutes from "./user.route";

import { authenticateUser, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

// Google auth routes
router.use("/", authRoutes);

router.use('/superAdmin', authenticateUser, authorizeRole(['SUPER_ADMIN']),  superAdminRoutes)



export default router;
