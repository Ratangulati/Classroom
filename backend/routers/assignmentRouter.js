import express from "express";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentsByClassId, getAssignmentsByStudentId } from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.delete("/:id", deleteAssignment);
router.get('/class/:classId', getAssignmentsByClassId);
router.get('/student/:studentId', getAssignmentsByStudentId);


export default router;