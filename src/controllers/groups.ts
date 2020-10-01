import { createPopulateLocalsWithLogInfo, logMethodErrors  } from '../logger';
import { GroupService } from '../services/groups';

const populateLocalsWithLogInfo = createPopulateLocalsWithLogInfo('GroupService');

class GroupControllerClass {
    @logMethodErrors
    async addUsers(req, res, next) {
        const { groupId, userIds } = req.body;
        const areUsersAdded = await GroupService.addUsersToGroup(groupId, userIds);

        populateLocalsWithLogInfo('addUsersToGroup', [groupId, userIds], res);

        if (!areUsersAdded) {
            res.sendStatus(400);
        }
        res.end();
        next();
    }

    @logMethodErrors
    async delete(req, res, next) {
        const { id } = req.params;
        const isGroupDeleted = await GroupService.delete(id);

        populateLocalsWithLogInfo('delete', id, res);

        if (!isGroupDeleted) {
            res.sendStatus(404);
        }

        res.end();
        next();
    }

    @logMethodErrors
    async get(req, res, next) {
        const { id } = req.params;
        const group = await GroupService.get(id);

        populateLocalsWithLogInfo('get', id, res);

        if (!group) {
            res.sendStatus(404);
        }

        res.send(group).end();
        next();
    }

    @logMethodErrors
    async getAll(req, res, next) {
        const groups = await GroupService.getAll();

        populateLocalsWithLogInfo('getAll', undefined, res);

        if (!groups) {
            res.sendStatus(400);
        }

        res.send(groups).end();
        next();
    }

    @logMethodErrors
    async post(req, res, next) {
        const newGroupId = await GroupService.create(req.body);

        populateLocalsWithLogInfo('create', req.body, res);

        if (!newGroupId) {
            res.sendStatus(400);
        }

        res.status(201).send(newGroupId).end();
        next();
    }

    @logMethodErrors
    async put(req, res, next) {
        const { id } = req.params;
        const group = await GroupService.update(id, req.body);

        populateLocalsWithLogInfo('update', [id, req.body], res);

        if (!group) {
            res.sendStatus(404);
        }

        res.send(group).end();
        next();
    }
}

export const GroupController = new GroupControllerClass();
