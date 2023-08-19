"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
// import * as middlewares from './middlewares';
const defaultRoute = '/api/v1';
require('dotenv').config();
const app = (0, express_1.default)();
const base_url = '/api/v1';
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(base_url + "/auth", (0, express_http_proxy_1.default)("http://localhost:4001"));
// app.use(base_url + '/courses', proxy('http://localhost:4002'))
// app.use(base_url + '/payments', authMiddleware.authenticateUser, proxy('http://localhost:4003'))
// app.use(base_url + '/learner', proxy('http://localhost:4004'))
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);
exports.default = app;
