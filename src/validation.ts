import Joi from 'joi';
// eslint-disable-next-line no-unused-vars
import { RequestHandler } from 'express';

const schema = Joi.object({
    age: Joi.number().min(4).max(130).required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().pattern(/[A-Za-z]/).pattern(/\d/).required()
});

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

const validateUser: RequestHandler = (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false
    });

    if (error && error.isJoi) {
        res.status(400).json(errorResponse(error.details));
    } else {
        next();
        return;
    }
};

module.exports = validateUser;
