import { Notice } from "../models/noticeSchema.js";
import mongoose from "mongoose";

export const createNotice = async (req, res, next) => {
  const { title, content } = req.body;
  const { classId } = req.params;

  try {
    if (!title || !content || !classId) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const notice = await Notice.create({ title, content, class: classId });

    res.status(201).json({
      success: true,
      message: "Notice Created!",
      notice
    });
  } catch (err) {
    console.error('Error creating notice:', err);
    next(err);
  }
};

export const getStudentNotices = async (req, res, next) => {
  const { classId } = req.query;

  try {
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const notices = await Notice.find({ class: classId }).populate('class');

    res.status(200).json({
      success: true,
      notices,
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    next(err);
  }
};

export const getAllNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find().populate('class');
    res.status(200).json({
      success: true,
      notices,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteNotice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, message: "Notice deleted successfully" });
  } catch (err) {
    next(err);
  }
};
