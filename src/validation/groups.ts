import Joi = require('joi');
import { validateSchema } from './utils';
import { GroupPermissions } from '../models/groups';
import { RequestHandler } from 'express';

const groupCreationSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().required())
});
const groupUpdateSchema = groupCreationSchema.optional();

const validateGroupCreationSchema = validateSchema(groupCreationSchema);
const validateGroupUpdateSchema = validateSchema(groupUpdateSchema);

const filterPermissions: RequestHandler = (req, res, next) => {
    const { permissions } = req.body;

    if (permissions) {
        const filteredPermissions = permissions.filter(permission => GroupPermissions.includes(permission));

        req.body.permissions = filteredPermissions;
    }

    next();
};

export const validateGroupCreationParams = [validateGroupCreationSchema, filterPermissions];
export const validateGroupUpdateParams = [validateGroupUpdateSchema, filterPermissions];
