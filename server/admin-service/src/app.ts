import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";
import router from "./routes/router";
import env from "dotenv";

env.config();

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://localhost:3000",
		methods: "GET,POST,PUT,DELTE",
		credentials: true
	})
);
app.use(express.json());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	}),
);

app.use(router);

export default app;
