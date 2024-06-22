import express from "express";
import { createAssignment, deleteAssignment, getAllAssignments } from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.delete("/:id", deleteAssignment);

export default router;