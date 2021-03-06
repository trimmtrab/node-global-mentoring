import uuid = require('uuid');
import { Group } from '../models';
import { GroupType } from '../models/groups';
import { UserType } from '../models/users';
import { sequelize } from '../initDB';

class GroupServiceClass {
    private readonly UPDATE_PROPERTIES = ['name', 'permissions'];

    async addUsersToGroup(groupId: GroupType['id'], userIds: UserType['id'][]) {
        const group = await Group.findByPk(groupId);

        if (!group) {
            return false;
        }

        const t = await sequelize.transaction();

        try {
            await group.addUsers(userIds, { transaction: t });
            await t.commit();
        } catch {
            await t.rollback();
            return false;
        }
        return true;
    }

    async create({ name, permissions }: Pick<GroupType, 'name' | 'permissions'>) {
        const groupWithSameNameExists = await Group.findOne({
            where: { name }
        });

        if (groupWithSameNameExists) {
            return;
        }

        const newGroup = Group.build({
            id: uuid.v4(),
            name,
            permissions
        });

        await newGroup.save();
        return newGroup.id;
    }

    async delete(id: GroupType['id']) {
        const group = await Group.findByPk(id);

        if (!group) {
            return false;
        }

        await group.destroy();
        return true;
    }

    async get(id: GroupType['id']) {
        const group = await Group.findByPk(id);

        if (!group) {
            return;
        }

        return group;
    }

    async getAll() {
        const groups = await Group.findAll();

        return groups;
    }

    async update(id: GroupType['id'], updateProps: Omit<GroupType, 'id'>) {
        const group = await Group.findByPk(id);

        if (!group) {
            return;
        }

        this.UPDATE_PROPERTIES.forEach(prop => {
            if (updateProps[prop] !== undefined) {
                group[prop] = updateProps[prop];
            }
        });

        await group.save();
        return group;
    }
}

export const GroupService = new GroupServiceClass();
