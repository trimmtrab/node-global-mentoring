const mockUsers = require('./mock');

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

const createUserToSend = (user: User) => ({
    id: user.id,
    login: user.login,
    age: user.age
});

const users: User[] = mockUsers;

const findUser = (id: User['id']) => users.find(user => !user.isDeleted && user.id === id);

module.exports = {
    createUserToSend,
    findUser,
    users
};
