import { ErrorRequestHandler, RequestHandler } from 'express';
import { logger } from './logger';

export const catchAsync = (fn: RequestHandler): RequestHandler =>
    (req, res, next) => fn(req, res, next).catch(next);

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    logger.error(err.message);
    res.status(500).send('Error ocurred');
};

export const uncaughtExceptionHandler: NodeJS.UncaughtExceptionListener = (error) => {
    logger.error(`Uncaught exception: ${error.message}`);
};

export const unhandledRejectionHandler: NodeJS.UnhandledRejectionListener = (reason, p) => {
    logger.error(`Unhandled rejection at ${p} reason: ${reason}`);
};
