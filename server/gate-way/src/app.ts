import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import proxy from "express-http-proxy";
// import * as middlewares from './middlewares';
const defaultRoute: string = '/api/v1';
require('dotenv').config();

const app = express();
const base_url: string = '/api/v1'
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(base_url + "/auth", proxy("http://localhost:5001"));
// app.use(base_url + '/courses', proxy('http://localhost:4002'))
// app.use(base_url + '/payments', authMiddleware.authenticateUser, proxy('http://localhost:4003'))
// app.use(base_url + '/learner', proxy('http://localhost:4004'))
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

export default app;
