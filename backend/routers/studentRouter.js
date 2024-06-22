import express from 'express' 
import { createStudent, deleteStudent, getAllStudents, getStudentById, studentSignIn } from '../controllers/studentController.js';

const router = express.Router();

router.get('/getall', getAllStudents);
router.get('/:id', getStudentById); 
router.post('/', createStudent);
router.delete('/:id', deleteStudent); 
router.post('/signin', studentSignIn);


export default router;