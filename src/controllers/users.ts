import { createPopulateLocalsWithLogInfo, logMethodErrors } from '../logger';
import { UserService } from '../services/users';

const populateLocalsWithLogInfo = createPopulateLocalsWithLogInfo('UserService');

class UserControllerClass {
    @logMethodErrors
    async autoSuggest(req, res, next) {
        const { limit, login } = req.query;
        const parsedLimit = parseInt(limit as string, 10);
        const users = await UserService.autoSuggest(
            parsedLimit,
          login as string
        );

        populateLocalsWithLogInfo('autoSuggest', [parsedLimit, login], res);

        res.send(users).end();
        next();
    }

    @logMethodErrors
    async delete(req, res, next) {
        const { id } = req.params;
        const isUserDeleted = await UserService.delete(id);

        populateLocalsWithLogInfo('delete', id, res);

        if (isUserDeleted) {
            res.end();
        } else {
            res.sendStatus(404);
        }
        next();
    }

    @logMethodErrors
    async get(req, res, next) {
        const { id } = req.params;
        const user = await UserService.get(id);

        populateLocalsWithLogInfo('get', id, res);

        if (user) {
            res.send(user).end();
        } else {
            res.sendStatus(404);
        }
        next();
    }

    @logMethodErrors
    async post(req, res, next) {
        const newUserId = await UserService.create(req.body);

        populateLocalsWithLogInfo('create', req.body, res);

        if (newUserId) {
            res.status(201).send(newUserId).end();
        } else {
            res.sendStatus(400);
        }
        next();
    }

    @logMethodErrors
    async put(req, res, next) {
        const { id } = req.params;
        const user = await UserService.update(id, req.body);

        populateLocalsWithLogInfo('update', [id, req.body], res);

        if (user) {
            res.send(user).end();
        } else {
            res.sendStatus(404);
        }
        next();
    }
}

export const UserController = new UserControllerClass();
