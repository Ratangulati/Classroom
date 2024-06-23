import express from 'express' 
import { createStudent, deleteStudent, getAllStudents, getStudentById, getStudentClass, studentSignIn } from '../controllers/studentController.js';

const router = express.Router();

router.get('/getall', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
// router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.post('/signin', studentSignIn);
router.get('/:studentId/class', getStudentClass);


export default router;