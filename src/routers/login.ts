import express = require('express');
import { catchAsync } from '../errorHandlers';
import { UserService } from '../services/users';

export const loginRouter = express.Router();

loginRouter.post('/', catchAsync(
    async (req, res) => {
        const { password, username } = req.body;

        if (!password || !username) {
            res.status(401).send('Username or password is absent');
            return;
        }

        const token = await UserService.login(username, password);

        if (!token) {
            res.status(401).send('Invalid username or password').end();
            return;
        }
        res.send(token).end();
    }
));
