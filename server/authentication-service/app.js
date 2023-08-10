const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { EventEmitter } = require("events");
const { config } = require("dotenv");

const eventEmitter = new EventEmitter();
config({
    path: "./src/config/config.env",
});

if (cluster.isMaster && process.env.ENVIRONMENT_NAME !== 'Dev') {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // Emit a restart event when a worker dies and a new worker is forked
        eventEmitter.emit("restart");
        cluster.fork();
    });
    // Emit a start event when all workers have been forked and the server has started
    eventEmitter.emit("start");
}
else {
    const express = require('express');
    const cors = require('cors');
    const helmet = require('helmet')
    const proxy = require('express-http-proxy')
    const connectDatabase = require("./src/utils/database");
    const authMiddleware = require('./src/middleware/authMiddleware')
    const base_url = '/api/v1'
    connectDatabase();
    const app = express();


    app.use(express.json());
    app.use(cors());
    app.use(helmet());


    app.use(base_url + '/user', proxy('http://localhost:4001'))
    app.use(base_url + '/courses', authMiddleware.authenticateUser, proxy('http://localhost:4002'))
    app.use(base_url + '/payments', authMiddleware.authenticateUser, proxy('http://localhost:4003'))
    app.use(base_url + '/learner', proxy('http://localhost:4004'))

    app.listen(process.env.PORT, () => {
        console.log("API gateway connected on port 4000")
    })
}