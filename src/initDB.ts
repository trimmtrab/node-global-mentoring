import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize = new Sequelize(config.dbName, 'postgres', config.dbPassword, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
