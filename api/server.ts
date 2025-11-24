import express from 'express';
import dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// GET the port from the environment variable
const port = process.env.PORT || 3000;

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});