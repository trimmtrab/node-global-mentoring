import Joi = require('joi');
import { RequestHandler } from 'express';

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]) => {
    const errors = schemaErrors.map(({ path, message }) => ({
        path,
        message
    }));

    return {
        status: 'failed',
        errors
    };
};

type ValidationSource = 'body' | 'query';

export const validateSchema = (schema: Joi.ObjectSchema, source: ValidationSource = 'body'): RequestHandler => (req, res, next) => {
    const data = source === 'body' ? req.body : req.query;
    const { error } = schema.validate(data, {
        abortEarly: false
    });

    if (error && error.isJoi) {
        res.status(400).json(errorResponse(error.details));
    } else {
        next();
        return;
    }
};
