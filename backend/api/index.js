import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import { errorHandler } from '../middlewares/errorHandler.js';
import studentRouter from "../routers/studentRouter.js"
import eventsRouter from "../routers/eventsRouter.js"
import libraryRouter from "../routers/libraryRouter.js"
import teacherRouter from "../routers/teacherRouter.js"
import adminRegisterRouter from "../routers/adminRegisterRouter.js"
import attendanceRouter from "../routers/attendanceRouter.js"
import announcementRouter from "../routers/announcementRouter.js"
import classRouter from "../routers/classRouter.js"
import assignmentRouter from "../routers/assignmentRouter.js"
import adminSigninRouter from "../routers/adminSigninRouter.js"
import noticeRouter from "../routers/noticeRouter.js"
import { dbConnection } from '../db/dbConnection.js';



const app = express();
config({path: "./config/config.env"});

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next)
})

// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://classroom-one-opal.vercel.app'
//   ];
  
//   app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }));
  
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.status(200).json({msg: "Welcome to Classroom!"}))
 
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/admin", adminRegisterRouter);
app.use("/api/v1/admin", adminSigninRouter);


app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/announcement", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use('/api/v1/notices', noticeRouter);


dbConnection();

app.listen(process.env.PORT, () => {
    console.log( `Server listening on port ${process.env.PORT} `);
});