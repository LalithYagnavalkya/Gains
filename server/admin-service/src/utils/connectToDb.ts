import mongoose from "mongoose";
import { config } from "dotenv";

config({
	path: "./src/config/config.env",
});
const dbString: string = process.env.MONGO_CONNECTION_STRING!;
const connectToDb = async () => {
	try {
		await mongoose.connect(dbString);
		return Promise.resolve();
	} catch (error) {
		process.exit(1);
	}
};

export default connectToDb;
