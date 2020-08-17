import { DataTypes, Model, BelongsToManyAddAssociationsMixin } from 'sequelize';
import { sequelize } from '../initDB';
import { User, UserType } from './users';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
export const GroupPermissions: Permission[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export type GroupType = {
  id: string;
  name: string;
  permissions: Permission[];
};

type GroupCreationAttributes = GroupType;

interface GroupInstance
  extends Model<GroupType, GroupCreationAttributes>,
    GroupType {
      addUsers: BelongsToManyAddAssociationsMixin<typeof User, UserType['id']>
    }

export const Group = sequelize.define<GroupInstance>('groups', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID
    },
    name: DataTypes.TEXT,
    permissions: DataTypes.ARRAY(DataTypes.TEXT)
}, {
    timestamps: false
});
