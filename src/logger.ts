import { RequestHandler, Response } from 'express';
import winston = require('winston');

export const logger = winston.createLogger({
    transports: new winston.transports.Console()
});

export const logMethodErrors = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function methodLogger(...args: any[]) {
        try {
            const result = await originalMethod.apply(this, args);

            return result;
        } catch (error) {
            const className = target?.constructor?.name;
            const methodName = propertyKey;
            // Выдает ошибку при попытке сдлеать JSON.stringify для req, res, next
            // const argsString = stringifyArgs(args);
            const errorLog = `Error ocurred in ${className}.${methodName}: ${error.message}`;

            logger.error(errorLog);
            throw error;
        }
    };
};

export const createPopulateLocalsWithLogInfo = (
    serviceName: string,
) => (
    methodName: string,
    methodArguments: any | any[],
    res: Response
) => {
    res.locals.invokedServiceName = serviceName;
    res.locals.invokedMethodName = methodName;
    res.locals.invokedMethodArguments = Array.isArray(methodArguments) ?
        methodArguments :
        [methodArguments];
};

const stringifyArgs = (args: unknown[]) => args.reduce<string>((acc, arg, idx) => {
    const delimiter = idx > 0 ? ',' : '';
    return  `${acc}${delimiter}${JSON.stringify(arg)}`;
}, '');

export const logServiceMethods: RequestHandler = (req, res) => {
    const { invokedMethodName, invokedMethodArguments, invokedServiceName } = res.locals;

    if (invokedMethodName && invokedMethodArguments && invokedServiceName) {
        logger.info(
            `${invokedServiceName}.${invokedMethodName} called with arguments: ${stringifyArgs(invokedMethodArguments)}`
        );
    }
};
