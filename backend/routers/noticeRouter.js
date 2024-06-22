import express from "express";
import { createNotice, getAllNotices, deleteNotice } from "../controllers/noticeController.js";

const router = express.Router();

router.post("/", createNotice);
router.get("/getall", getAllNotices);
router.delete("/:id", deleteNotice);

export default router;