import { Group } from './groups';
import { User } from './users';

User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

export default {
    Group,
    User
};
