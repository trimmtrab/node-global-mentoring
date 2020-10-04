import express = require('express');
import { catchAsync } from '../errorHandlers';
import { validateUser, validateAutosuggestParams } from '../validation/users';
import { UserController } from '../controllers/users';

export const userRouter = express.Router();

userRouter.route('/:id')
    .delete(catchAsync(UserController.delete))
    .get(catchAsync(UserController.get))
    .put(validateUser, catchAsync(UserController.update));

userRouter.route('/')
    .get(validateAutosuggestParams, catchAsync(UserController.autoSuggest))
    .post(validateUser, catchAsync(UserController.create));
