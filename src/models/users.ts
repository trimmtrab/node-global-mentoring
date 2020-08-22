import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../initDB';

export type UserType = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

interface UserCreationAttributes extends Optional<UserType, 'id'> {}

interface UserInstance
  extends Model<UserType, UserCreationAttributes>,
    UserType {}

export const User = sequelize.define<UserInstance>('users', {
    id: {
        primaryKey: true,
        type: DataTypes.TEXT
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
