"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const events_1 = require("events");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
// import cors from "cors";
// import helmet from "helmet";
// import proxy from "express-http-proxy";
const eventEmitter = new events_1.EventEmitter();
(0, dotenv_1.config)({
    path: "./src/config/config.env",
});
if (cluster_1.default.isMaster && process.env.ENVIRONMENT_NAME !== "Dev") {
    // Fork workers.
    const numCPUs = os_1.default.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // Emit a restart event when a worker dies and a new worker is forked
        eventEmitter.emit("restart");
        cluster_1.default.fork();
    });
    // Emit a start event when all workers have been forked and the server has started
    eventEmitter.emit("start");
}
else {
    //   const connectDatabase = require("./src/utils/database");
    //   const authMiddleware = require("./src/middleware/authMiddleware");
    const base_url = "/api/v1";
    //   connectDatabase();
    const app = (0, express_1.default)();
    // app.use(express.json());
    // app.use(cors());
    // app.use(helmet());
    // app.use(base_url + "/auth", proxy("http://localhost:4001"));
    // app.use(base_url + '/courses', proxy('http://localhost:4002'))
    // app.use(base_url + '/payments', authMiddleware.authenticateUser, proxy('http://localhost:4003'))
    // app.use(base_url + '/learner', proxy('http://localhost:4004'))
    app.get("/", (req, res) => {
        return res.send("<h1>testing out typescript</h1>");
    });
    app.listen(process.env.PORT, () => {
        console.log("API gateway connected on port 4000");
    });
}
