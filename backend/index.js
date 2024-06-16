import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import { dbConnection } from './db/dbConnection.js';
import studentRouter from "./routers/studentRouter.js"

const app = express();
config({path: "./config/config.env"});

app.use(cors()); 
app.use(express.json());

app.use("api/v1/students", studentRouter)

dbConnection();

app.listen(process.env.PORT, () => {
    console.log( `Server listening on port ${process.env.PORT} `);
});