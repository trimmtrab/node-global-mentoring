import { GroupController } from '../controllers/groups';
import { createResMock, expectSentStatus } from '../testUtils';
const { GroupService } = require('../services/groups');

jest.mock('../logger.ts');
jest.mock('../services/groups');

let res;
let next;

describe('Test user controller', () => {
    beforeEach(() => {
        res = createResMock();
        next = jest.fn();
    });

    test('Should call addUsersToGroup correctly when service method works', async () => {
        const req = {
            body: {
                groupId: GroupService.addUsersToGroupCorrectGroupId
            }
        };

        await GroupController.addUsersToGroup(req, res, next);

        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call addUsersToGroup correctly when service method doesn\'t work', async () => {
        const req = {
            body: {
                groupId: 'some wrong id '
            }
        };

        await GroupController.addUsersToGroup(req, res, next);

        expectSentStatus(res, 400);
        expect(next).toBeCalled();
    });

    test('Should call create correctly when service method works', async () => {
        const req = {
            body: {
                name: 'some unique name'
            }
        };

        await GroupController.create(req, res, next);

        expect(res.status).toHaveBeenLastCalledWith(201);
        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(GroupService.newGroupId);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call create correctly when service method doesn\'t work', async () => {
        const req = {
            body: {
                name: GroupService.existingGroupName
            }
        };

        await GroupController.create(req, res, next);

        expectSentStatus(res, 400);
        expect(next).toBeCalled();
    });

    test('Should call delete correctly when service method works', async () => {
        const req = {
            params: {
                id: GroupService.existingGroupId
            }
        };

        await GroupController.delete(req, res, next);

        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call delete correctly when service method doesn\'t work', async () => {
        const req = {
            params: {
                id: 'some nonexisting id'
            }
        };

        await GroupController.delete(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });

    test('Should call get correctly when service method works', async () => {
        const req = {
            params: {
                id: GroupService.existingGroupId
            }
        };

        await GroupController.get(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(GroupService.getResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call get correctly when service method doesn\'t work', async () => {
        const req = {
            params: {
                id: 'some nonexisting id'
            }
        };

        await GroupController.get(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });

    test('Should call getAll correctly', async () => {
        const req = {};

        await GroupController.getAll(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(GroupService.getAllResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call update correctly when service method works', async () => {
        const req = {
            params: {
                id: GroupService.existingGroupId
            }
        };

        await GroupController.update(req, res, next);

        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith(GroupService.updateResponse);
        expect(res.end).toBeCalled();
        expect(next).toBeCalled();
    });

    test('Should call update correctly when service method doesn\'t work', async () => {
        const req = {
            params: {
                id: 'some nonexisting group id'
            }
        };

        await GroupController.update(req, res, next);

        expectSentStatus(res, 404);
        expect(next).toBeCalled();
    });
});

