import express = require('express');
import { validateUser, validateAutosuggestParams } from '../validation/users';
import { UserService } from '../services/users';

export const userRouter = express.Router();

userRouter.route('/:id')
    .delete(async (req, res) => {
        const { id } = req.params;

        if (await UserService.delete(id)) {
            res.end();
        } else {
            res.sendStatus(404);
        }
    })
    .get(async (req, res) => {
        const { id } = req.params;
        const user = await UserService.get(id);

        if (user) {
            res.send(user).end();
        } else {
            res.sendStatus(404);
        }
    })
    .patch(validateUser, async (req, res) => {
        const { id } = req.params;
        const user = await UserService.update(id, req.body);

        if (user) {
            res.send(user).end();
        } else {
            res.sendStatus(404);
        }
    });

userRouter.route('/')
    .get(validateAutosuggestParams, async (req, res) => {
        const { limit, login } = req.query;
        const users = await UserService.autoSuggest(
            parseInt(limit as string, 10),
            login as string
        );

        if (users) {
            res.send(users).end();
        } else {
            res.sendStatus(400);
        }
    })
    .post(validateUser, async (req, res) => {
        const newUserId = await UserService.create(req.body);

        if (newUserId) {
            res.status(201).send(newUserId).end();
        } else {
            res.sendStatus(400);
        }
    });