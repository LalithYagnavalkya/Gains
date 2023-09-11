import cluster from "cluster";
import os from "os"; // Node's built-in os module
import app from "./app";
import { config } from "dotenv";
import connectToDb from "./utils/connectToDb";
import logger from "./utils/logger";

config({
	path: "./src/config/config.env",
});

const numCPUs = os.cpus().length;

if (cluster.isPrimary && process.env.ENVIRONMENT_NAME !== "Dev") {
	// logger.info(process.env.ENVIRONMENT_NAME);
	// Fork workers for each CPU core
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker) => {
		logger.info(`Worker ${worker.process.pid} died`);
		// Replace the dead worker
		cluster.fork();
	});
} else {
	// Code to run in each worker process
	const port = process.env.PORT || 4002;

	app.listen(port, async () => {
		logger.info(`Worker ${cluster.worker?.id ? cluster.worker?.id: ""}is listening on port ${port} admin-service`);
		await connectToDb();
	});
}
