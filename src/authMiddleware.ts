import jwt = require('jsonwebtoken');
import { RequestHandler } from 'express';
import { config } from '../config';


export const authMiddleware: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send('Authorization header is absent').end();
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send('No token provided').end();
        return;
    }

    jwt.verify(token, config.secret, (err) => {
        if (err) {
            res.status(403).send('Invalid token').end();
        }

        next();
    });
};
