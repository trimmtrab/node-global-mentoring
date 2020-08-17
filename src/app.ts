import express = require('express');
require('dotenv').config();
import { initDB } from './initDB';
import { groupRouter } from './routers/groups';
import { userRouter } from './routers/users';

initDB();

const app = express();

app.use(express.json());
app.use('/groups', groupRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
