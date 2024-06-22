import { Notice } from "../models/noticeSchema.js";


export const createNotice = async (req, res, next) => {
  const { title, content, classId } = req.body;
  try {
    if (!title || !content || !classId) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const notice = await Notice.create({ title, content, class: classId });
    res.status(201).json({
      success: true,
      message: "Notice Created!",
      notice
    });
  } catch (err) {
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
