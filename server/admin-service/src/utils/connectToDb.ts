import mongoose from "mongoose";
import { config } from "dotenv";
import logger from "./logger";

config({
	path: "./src/config/config.env",
});
const dbString: string = process.env.MONGO_CONNECTION_STRING!;
const connectToDb = async () => {
	try {
		await mongoose.connect(dbString);
		logger.info("connected to DB");
		return Promise.resolve();
	} catch (error) {
		logger.error("Error connecting to the database:", error);
		process.exit(1);
	}
};

export default connectToDb;
