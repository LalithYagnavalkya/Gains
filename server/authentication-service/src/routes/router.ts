import { Router, Request, Response } from "express";
import authRoutes from './auth'
const router = Router();

// Google auth routes 
router.use("/", authRoutes);

export default router;