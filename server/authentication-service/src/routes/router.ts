import { Request, Response, NextFunction, Router } from "express"; 

import superAdminRoutes from './superAdmin.route'
import authRoutes from "./user.route";

import { authenticateUser } from "../middleware/auth.middleware";
import { roleAuthorization } from "../middleware/roleAuth.middleware";
const router = Router();

// Google auth routes
router.use("/", authRoutes);

router.use('/superAdmin', superAdminRoutes)



export default router;
