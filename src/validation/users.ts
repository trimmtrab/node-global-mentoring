import Joi = require('joi');
import { validateSchema } from './utils';

const autosuggestParamsSchema = Joi.object({
    limit: Joi.number().min(1),
    login: Joi.string().allow('')
});

const userSchema = Joi.object({
    age: Joi.number().min(4).max(130).required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum()
        .pattern(/[A-Za-z]/, 'must contain letters')
        .pattern(/\d/, 'must contain digits')
        .required()
});

export const validateAutosuggestParams = validateSchema(autosuggestParamsSchema, 'query');
export const validateUser = validateSchema(userSchema);
