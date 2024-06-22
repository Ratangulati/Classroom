import express from "express";
import { createClass, getAllClasses, getClassById, addStudent, deleteStudent, addTeacher, deleteTeacher, addSubject, deleteSubject, getTeacherById, getAllTeachers, getClassTeachers } from "../controllers/classController.js";

const router = express.Router();

// Routes for classes
router.get('/getall', getAllClasses);
router.post('/', createClass);
router.get('/:classId', getClassById);
router.get('/:classId/teachers', getClassTeachers);

// Routes for students
router.post('/:classId/students', addStudent);
router.delete('/:classId/students/:studentId', deleteStudent);

// Routes for teachers
router.post('/:classId/teachers', addTeacher);
router.delete('/:classId/teachers/:teacherId', deleteTeacher);
router.get('/teachers', getAllTeachers);

// Routes for subjects
router.post('/:classId/subjects', addSubject);
router.delete('/:classId/subjects/:subjectId', deleteSubject);


export default router;