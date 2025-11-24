import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD?.toString(),
    database: process.env.DB_NAME,
    synchronize: true, // Set to false in production and use migrations instead
    logging: false,
});

const connectDb = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

export { connectDb };
