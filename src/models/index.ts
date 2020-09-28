import { Group as GroupModel } from './groups';
import { User as UserModel } from './users';

UserModel.belongsToMany(GroupModel, { through: 'UserGroup' });
GroupModel.belongsToMany(UserModel, { through: 'UserGroup' });

export const Group = GroupModel;
export const User = UserModel;
