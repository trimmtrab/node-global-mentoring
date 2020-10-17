import { UserController } from '../controllers/users';
import { createResMock, expectSentStatus } from '../testUtils';
const { UserService } = require('../services/users');

jest.mock('../logger.ts');
jest.mock('../services/users');

let res;
let next;

describe('Test user controller', () => {
    beforeEach(() => {
        res = createResMock();
        next = jest.fn();
    });

    test('Should call autoSuggest correctly', async () => {
        const req = {
            query: {
                limit: '10',
                login: 'test'
            } };

        await UserController.autoSuggest(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(UserService.autoSuggestResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call create correctly when new user login doesn\'t already exist', async () => {
        const req = {
            body: {
                login: 'somethingUnique'
            }
        };

        await UserController.create(req, res, next);

        expect(res.status).toHaveBeenLastCalledWith(201);
        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(UserService.newUserId);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call create correctly when new user login already exists', async () => {
        const req = {
            body: {
                login: UserService.existingLogin
            }
        };

        await UserController.create(req, res, next);

        expectSentStatus(res, 400);
        expect(next).toBeCalled();
    });

    test('Should call delete correctly when user exists', async () => {
        const req = {
            params: {
                id: UserService.existingUserId
            }
        };

        await UserController.delete(req, res, next);

        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call delete correctly when user doesn\'t exist', async () => {
        const req = {
            params: {
                id: 'nonExistingUser'
            }
        };

        await UserController.delete(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });

    test('Should call get correctly when user exists', async () => {
        const req = {
            params: {
                id: UserService.existingUserId
            }
        };

        await UserController.get(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(UserService.getResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call get correctly when user doesn\'t exist', async () => {
        const req = {
            params: {
                id: 'nonExistingUser'
            }
        };

        await UserController.get(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });

    test('Should call update correctly when user exists', async () => {
        const req = {
            params: {
                id: UserService.existingUserId
            }
        };

        await UserController.update(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(UserService.updateResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call update correctly when user doesn\'t exist', async () => {
        const req = {
            params: {
                id: 'nonExistingUser'
            }
        };

        await UserController.update(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });
});

