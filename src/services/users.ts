import { Op } from 'sequelize';
import uuid = require('uuid');
import { User, UserType } from '../models/users';

class UserServiceClass {
    private readonly UPDATE_PROPERTIES = ['age', 'login', 'password']

    async autoSuggest(limit = 100, login: string) {
        const users = await User
            .findAll({
                attributes: ['age', 'id', 'login'],
                where: {
                    isDeleted: false,
                    login: {
                        [Op.substring]: login
                    }
                },
                order: [
                    ['login', 'ASC']
                ],
                limit
            });

        return users;
    }

    async create({ age, login, password }: Pick<UserType, 'age' | 'login' | 'password'>) {
        const userWithSameLoginExists = await User.findOne({
            where: { isDeleted: false, login }
        });

        if (!userWithSameLoginExists) {
            const newUser = User.build({
                id: uuid.v4(),
                login,
                password,
                age,
                isDeleted: false
            });

            await newUser.save();
            return newUser.id;
        }
    }

    private createUserToSend(user: UserType) {
        return ({
            id: user.id,
            login: user.login,
            age: user.age
        });
    }

    async delete(id: UserType['id']) {
        const user = await this.findActiveById(id);

        if (!user) {
            return false;
        }

        user.isDeleted = true;
        await user.save();

        return true;
    }

    private async findActiveById(id: UserType['id']) {
        const user = await User.findByPk(id);

        if (!user || user.isDeleted) {
            return null;
        }
        return user;
    }

    async get(id: UserType['id']) {
        const user = await this.findActiveById(id);

        if (user) {
            return this.createUserToSend(user);
        }
    }

    async update(id: UserType['id'], updateProps: Pick<UserType, 'age' | 'login' | 'password'>) {
        const user = await this.findActiveById(id);

        if (user) {
            this.UPDATE_PROPERTIES.forEach(prop => {
                if (updateProps[prop] !== undefined) {
                    user[prop] = updateProps[prop];
                }
            });

            await user.save();
            return this.createUserToSend(user);
        }
    }
}

export const UserService = new UserServiceClass();
