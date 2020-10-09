import { createPopulateLocalsWithLogInfo, logMethodErrors  } from '../logger';
import { GroupService } from '../services/groups';

const populateLocalsWithLogInfo = createPopulateLocalsWithLogInfo('GroupService');

class GroupControllerClass {
    @logMethodErrors
    async addUsersToGroup(req, res, next) {
        const { groupId, userIds } = req.body;
        const areUsersAdded = await GroupService.addUsersToGroup(groupId, userIds);

        populateLocalsWithLogInfo('addUsersToGroup', [groupId, userIds], res);

        if (!areUsersAdded) {
            res.sendStatus(400);
        } else {
            res.end();
        }
        next();
    }

    @logMethodErrors
    async create(req, res, next) {
        const newGroupId = await GroupService.create(req.body);

        populateLocalsWithLogInfo('create', req.body, res);

        if (!newGroupId) {
            res.sendStatus(400);
        } else {
            res.status(201).send(newGroupId).end();
        }
        next();
    }

    @logMethodErrors
    async delete(req, res, next) {
        const { id } = req.params;
        const isGroupDeleted = await GroupService.delete(id);

        populateLocalsWithLogInfo('delete', id, res);

        if (!isGroupDeleted) {
            res.sendStatus(404);
        } else {
            res.end();
        }
        next();
    }

    @logMethodErrors
    async get(req, res, next) {
        const { id } = req.params;
        const group = await GroupService.get(id);

        populateLocalsWithLogInfo('get', id, res);

        if (!group) {
            res.sendStatus(404);
        } else {
            res.send(group).end();
        }
        next();
    }

    @logMethodErrors
    async getAll(req, res, next) {
        const groups = await GroupService.getAll();

        populateLocalsWithLogInfo('getAll', undefined, res);

        if (!groups) {
            res.sendStatus(400);
        } else {
            res.send(groups).end();
        }
        next();
    }

    @logMethodErrors
    async update(req, res, next) {
        const { id } = req.params;
        const group = await GroupService.update(id, req.body);

        populateLocalsWithLogInfo('update', [id, req.body], res);

        if (!group) {
            res.sendStatus(404);
        } else {
            res.send(group).end();
        }
        next();
    }
}

export const GroupController = new GroupControllerClass();
