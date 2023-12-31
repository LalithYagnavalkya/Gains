import { Router } from "express";
import dotenv from "dotenv";
import { runMembershipScheduler } from "../controllers/scheduler.controller";

dotenv.config({ path: "./src/config/config.env" });
const router = Router();

router.get('/runMembershipScheudler', runMembershipScheduler);

export default router;
