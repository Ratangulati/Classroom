import express from "express";

import { createTeacher, deleteTeacher, getAllTeachers, getClassesForTeacher, getTeacherById, teacherSignIn } from "../controllers/teacherController.js";
import { getClassById } from "../controllers/classController.js";
import { getAllAttendance, getAttendance, markAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.get('/getall', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', createTeacher);
router.delete('/:id', deleteTeacher);
router.get('/:teacherId/classes', getClassesForTeacher)
router.get('/:teacherId/classes/:classId', getClassById)

// Attendance
router.post('/:teacherId/classes/:classId/attendance', markAttendance);
router.get('/:teacherId/classes/:classId/attendance', getAttendance);
router.get('/:teacherId/classes/:classId/all-attendance', getAllAttendance);

router.post('/signin', teacherSignIn);




export default router;
 