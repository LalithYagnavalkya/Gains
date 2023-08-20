import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import proxy from "express-http-proxy";
// import * as middlewares from './middlewares';
const defaultRoute: string = '/api/v1';
require('dotenv').config({path: "./src/config/config.env"});

const app = express();
const base_url: string = '/api/v1'
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(base_url + "/auth", proxy(`http://localhost:${process.env.AUTH_PORT}`));

export default app;
