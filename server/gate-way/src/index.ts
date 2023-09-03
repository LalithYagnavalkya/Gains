import cluster from "cluster";
import os from "os"; // Node's built-in os module
import app from "./app";
import { config } from "dotenv";
config({
  path: "./src/config/config.env",
});
const numCPUs = os.cpus().length;
console.log(process.env.PORT);
if (cluster.isPrimary && process.env.ENVIRONMENT_NAME !== "Dev") {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Code to run in each worker process
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Worker ${cluster.worker?.id ? cluster.worker?.id : "" }is listening on port ${port} gate way`);
  });
}
