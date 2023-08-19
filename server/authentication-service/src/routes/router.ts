import { Router, Request, Response } from "express";

const router = Router();

// Import your route handlers here
import  from "./handlers/emojis"; // Import your emoji handler function

// Define your routes
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API!");
});

// Use imported route handlers
router.get("/emojis", getEmojis);

export default router;