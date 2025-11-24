import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './src/configs/connectDb.config';

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// initialize the body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize the database
connectDb();

// GET the port from the environment variable
const port = process.env.PORT || 3000;

// now use the routes
// 1. auth routes
app.use('/api/auth', require('./src/routes/auth.routes'));

// 2. issue routes
app.use('/api/issues', require('./src/routes/issues.routes'));

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});