import cors = require('cors');
import express = require('express');
require('dotenv').config();
import { config } from '../config';
import { authMiddleware } from './authMiddleware';
import {
    errorMiddleware,
    uncaughtExceptionHandler,
    unhandledRejectionHandler
} from './errorHandlers';
import { initDB } from './initDB';
import { logServiceMethods } from './logger';
import { groupRouter } from './routers/groups';
import { loginRouter } from './routers/login';
import { userRouter } from './routers/users';

initDB();

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

const app = express();

app.use(express.json());

app.use(cors());
app.disable('x-powered-by');

app.use('/login', loginRouter);
app.use(authMiddleware);
app.use('/groups', groupRouter);
app.use('/users', userRouter);
app.use(logServiceMethods);
app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
