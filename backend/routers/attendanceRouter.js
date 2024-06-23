import express from "express";
import { markAttendance, getAllAttendance, getStudentAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.post('/', markAttendance);
router.get('/getall', getAllAttendance);
router.get('/student/:studentId', getStudentAttendance);

export default router;