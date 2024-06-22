import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import { dbConnection } from './db/dbConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';

import studentRouter from "./routers/studentRouter.js"
import eventsRouter from "./routers/eventsRouter.js"
import libraryRouter from "./routers/libraryRouter.js"
import teacherRouter from "./routers/teacherRouter.js"
import adminRegisterRouter from "./routers/adminRegisterRouter.js"
import examRouter from "./routers/examRouter.js"
import attendanceRouter from "./routers/attendanceRouter.js"
import announcementRouter from "./routers/announcementRouter.js"
import classRouter from "./routers/classRouter.js"
import assignmentRouter from "./routers/assignmentRouter.js"
import adminSigninRouter from "./routers/adminSigninRouter.js"
import noticeRouter from "./routers/noticeRouter.js"



const app = express();
config({path: "./config/config.env"});

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next)
})

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
 
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/admin", adminRegisterRouter);
app.use("/api/v1/admin", adminSigninRouter);


app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use('/api/v1/notices', noticeRouter);


dbConnection();

app.listen(process.env.PORT, () => {
    console.log( `Server listening on port ${process.env.PORT} `);
});