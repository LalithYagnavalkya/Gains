"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os")); // Node's built-in os module
const app_1 = __importDefault(require("./src/app"));
const dotenv_1 = require("dotenv");
const connectToDb_1 = __importDefault(require("./src/utils/connectToDb"));
const logger_1 = __importDefault(require("./src/utils/logger"));
(0, dotenv_1.config)({
    path: "./src/config/config.env",
});
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary && process.env.ENVIRONMENT_NAME !== "Dev") {
    // logger.info(process.env.ENVIRONMENT_NAME);
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker) => {
        logger_1.default.info(`Worker ${worker.process.pid} died`);
        // Replace the dead worker
        cluster_1.default.fork();
    });
}
else {
    // Code to run in each worker process
    const port = process.env.PORT || 4002;
    app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        logger_1.default.info(`Worker ${((_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id) ? (_b = cluster_1.default.worker) === null || _b === void 0 ? void 0 : _b.id : ""}is listening on port ${port} admin-service`);
        yield (0, connectToDb_1.default)();
    }));
}
