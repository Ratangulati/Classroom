import { Assignment } from "../models/assignmentSchema.js";

export const createAssignment = async (req, res, next) => {
  const { title, description, classId, deadline } = req.body;
  console.log(req.body);
  try {
    if (!title || !description || !classId || !deadline) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const assignment = await Assignment.create({ title, description, class: classId, deadline });
    res.status(201).json({
      success: true,
      message: "Assignment Created!",
      assignment
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find().populate('class'); 
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAssignment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }
    res.status(200).json({ success: true, message: "Assignment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
