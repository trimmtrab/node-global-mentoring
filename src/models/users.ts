import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../initDB';

export type UserType = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type UserCreationAttributes = UserType;

interface UserInstance
  extends Model<UserType, UserCreationAttributes>,
    UserType {}

export const User = sequelize.define<UserInstance>('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID
    },
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false
});
