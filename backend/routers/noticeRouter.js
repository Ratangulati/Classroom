import express from "express";
import { createNotice, getAllNotices, deleteNotice, getStudentNotices } from "../controllers/noticeController.js";

const router = express.Router();

router.post("/:classId", createNotice);
router.get("/getall", getAllNotices);
router.delete("/:id", deleteNotice);
router.get("/student/:classId", getStudentNotices);

export default router;