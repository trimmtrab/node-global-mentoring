import { mockUsers } from './mock';

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export const createUserToSend = (user: User) => ({
    id: user.id,
    login: user.login,
    age: user.age
});

export const users: User[] = mockUsers;

export const findUser = (id: User['id']) => users.find(user => !user.isDeleted && user.id === id);
