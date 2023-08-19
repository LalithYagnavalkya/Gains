"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os")); // Node's built-in os module
const app_1 = __importDefault(require("./app"));
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Replace the dead worker
        cluster_1.default.fork();
    });
}
else {
    // Code to run in each worker process
    const port = process.env.PORT || 5000;
    app_1.default.listen(port, () => {
        var _a;
        console.log(`Worker ${(_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id} is listening on port ${port}`);
    });
}
