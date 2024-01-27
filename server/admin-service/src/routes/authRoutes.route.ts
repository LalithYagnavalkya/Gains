import { Router } from "express";
import dotenv from "dotenv";

//middlewares
import validateResource from "../middleware/validateResource";

//schemas
import { loginSchema, forgotPasswordSchema,resetPassowrdSchema } from "../schemas/auth.schema";

// controllers
import { login, forgotPassword, resetPassword } from "../controllers/auth.controller";

dotenv.config({ path: "./src/config/config.env" });

const router = Router();

router.post("/login", validateResource(loginSchema), login);

router.post("/forgotpassword", validateResource(forgotPasswordSchema), forgotPassword);

router.post('/resetpassword', validateResource(resetPassowrdSchema), resetPassword)