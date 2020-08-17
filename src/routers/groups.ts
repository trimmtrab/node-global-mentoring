import express = require('express');
import { GroupService } from '../services/groups';
import { validateGroupCreationParams, validateGroupUpdateParams } from '../validation/groups';

export const groupRouter = express.Router();

groupRouter.put('/addUsers', async (req, res) => {
    const { groupId, userIds } = req.body;
    const areUsersAdded = await GroupService.addUsersToGroup(groupId, userIds);

    if (!areUsersAdded) {
        res.sendStatus(400);
    }
    res.end();
});

groupRouter.route('/:id')
    .delete(async (req, res) => {
        const { id } = req.params;
        const isGroupDeleted = await GroupService.delete(id);

        if (!isGroupDeleted) {
            res.sendStatus(404);
        }

        res.end();
    })
    .get(async (req, res) => {
        const { id } = req.params;
        const group = await GroupService.get(id);

        if (!group) {
            res.sendStatus(404);
        }

        res.send(group).end();
    })
    .put(validateGroupUpdateParams, async (req, res) => {
        const { id } = req.params;
        const group = await GroupService.update(id, req.body);

        if (!group) {
            res.sendStatus(404);
        }

        res.send(group).end();
    });

groupRouter.route('/')
    .get(async (req, res) => {
        const groups = await GroupService.getAll();

        if (!groups) {
            res.sendStatus(400);
        }

        res.send(groups).end();
    })
    .post(validateGroupCreationParams, async (req, res) => {
        const newGroupId = await GroupService.create(req.body);

        if (!newGroupId) {
            res.sendStatus(400);
        }

        res.status(201).send(newGroupId).end();
    });
