import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import proxy, { ProxyOptions } from "express-http-proxy";
// import * as middlewares from './middlewares';
const defaultRoute: string = '/api/v1';
require('dotenv').config({ path: "./src/config/config.env" });

const app = express();
const base_url: string = '/api/v1'
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Define custom ProxyOptions with proxyOnProxyReq property
const customProxyOptions: ProxyOptions & { proxyOnProxyReq?: (proxyReq: any, req: any, res: any) => any } = {
    proxyOnProxyReq: (proxyReq, req, res): any => {
        if (req.headers['content-type'] === 'multipart/form-data') {
            // Handle multipart/form-data requests here if needed
        }

        return proxyReq;
    },
};
// Auth route
app.use(base_url + "/auth", proxy(`http://localhost:${process.env.AUTH_PORT}`));

// Admin route
app.use(base_url + "/admin", proxy(`http://localhost:${process.env.ADMIN_PORT}`, customProxyOptions));

export default app;