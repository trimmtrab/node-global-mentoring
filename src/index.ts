import express from 'express';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
const validateUser = require('./validation');
const { createUserToSend, findUser, users } = require('./users');

const app = express();

app.use(express.json());

const userRouter = express.Router();

app.use('/users', userRouter);

userRouter.route('/:id')
    .delete((req, res) => {
        const { id } = req.params;
        const user = findUser(id);

        if (user) {
            user.isDeleted = true;

            res.end();
        } else {
            res.sendStatus(404);
        }
    })
    .get((req, res) => {
        const { id } = req.params;
        const user = findUser(id);

        if (user) {
            const userToSend = createUserToSend(user);

            res.send(userToSend).end();
        } else {
            res.sendStatus(404);
        }
    })
    .patch(validateUser, (req, res) => {
        const { id } = req.params;
        const user = findUser(id);

        if (user) {
            const UPDATE_PROPERTIES = ['age', 'login', 'password'];

            UPDATE_PROPERTIES.forEach(prop => {
                if (req.body[prop]) {
                    user[prop] = req.body[prop];
                }
            });

            const userToSend = createUserToSend(user);

            res.send(userToSend).end();
        } else {
            res.sendStatus(404);
        }
    });

userRouter.route('/')
    .get((req, res) => {
        const { limit = Infinity, login = '' } = req.query;
        const isLimitValid = typeof limit === 'string' && validator.isInt(limit, { min: 1 });
        const isLoginValid = typeof login === 'string';

        if (isLimitValid && isLoginValid) {
            const usersToSend = users
                .filter(user => !user.isDeleted && user.login.includes(login))
                .sort(({ login: loginA }, { login: loginB }) => {
                    if (loginA < loginB) {
                        return -1;
                    } else if (loginA === loginB) {
                        return 0;
                    }
                    return 1;
                })
                .filter((user, idx) => idx < parseInt(limit as string, 10))
                .map(createUserToSend);

            res.send(usersToSend).end();
        } else {
            res.sendStatus(400);
        }
    })
    .post(validateUser, (req, res) => {
        const { age, login, password } = req.body;
        const userWithSameLoginExists = users.find(user => !user.isDeleted && user.login === login);

        if (!userWithSameLoginExists) {
            const newUser = {
                id: uuidv4(),
                login,
                password,
                age,
                isDeleted: false
            };

            users.push(newUser);
            res.status(201).send(newUser.id).end();
        } else {
            res.sendStatus(400);
        }
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
