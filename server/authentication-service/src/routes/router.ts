import { Router } from "express";
import authRoutes from "./auth.route";
import superAdminRoutes from './superAdmin.route'
const router = Router();

// Google auth routes
router.use("/", authRoutes);

router.use('/superAdmin', superAdminRoutes )



export default router;
