import express from "express";

const router = express.Router();

type EmojiResponse = string[];

router.get<null, EmojiResponse>("/", (req, res) => {
	res.json(["😀", "😳", "🙄"]);
});

export default router;
