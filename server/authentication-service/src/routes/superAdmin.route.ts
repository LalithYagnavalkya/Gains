import { Router, Request, Response, NextFunction } from "express";

//middlewares
import validateResource from "../middleware/validateResource";
import {authenticateUser, authorizeRole} from "../middleware/auth.middleware";

//controllers
import { registerAdmin } from "../controllers/super.controller";

//schemas
import { createAdminSchema } from '../schemas/createUser.schema'

import dotenv from "dotenv";
dotenv.config({ path: "./src/config/config.env" });

const router = Router();

//super admin route to create an admin
router.post('/registerAdmin', validateResource(createAdminSchema), registerAdmin);

export default router;
