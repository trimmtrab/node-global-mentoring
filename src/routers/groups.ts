import express = require('express');
import { catchAsync } from '../errorHandlers';
import { validateGroupCreationParams, validateGroupUpdateParams } from '../validation/groups';
import { GroupController } from '../controllers/groups';

export const groupRouter = express.Router();

groupRouter.put('/actions/addUsers',
    catchAsync(GroupController.addUsersToGroup));

groupRouter.route('/:id')
    .delete(catchAsync(GroupController.delete))
    .get(catchAsync(GroupController.get))
    .put(validateGroupUpdateParams, catchAsync(GroupController.update));

groupRouter.route('/')
    .get(catchAsync(GroupController.getAll))
    .post(validateGroupCreationParams, catchAsync(GroupController.create));
