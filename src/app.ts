import express = require('express');
require('dotenv').config();
import { errorMiddleware, uncaughtExceptionHandler, unhandledRejectionHandler } from './errorHandlers';
import { initDB } from './initDB';
import { logServiceMethods } from './logger';
import { groupRouter } from './routers/groups';
import { userRouter } from './routers/users';

initDB();

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

const app = express();

app.use(express.json());
app.use('/groups', groupRouter);
app.use('/users', userRouter);
app.use(logServiceMethods);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
