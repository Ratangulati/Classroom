import { Assignment } from "../models/assignmentSchema.js";
import { Class } from "../models/classSchema.js"; 

export const createAssignment = async (req, res, next) => {
  const { title, description, classId, deadline } = req.body;
  const teacherId = req.teacherId;
  try {
    if (!title || !description || !classId || !deadline) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const assignment = await Assignment.create({ title, description, class: classId, deadline, teacher: teacherId });
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
  const teacherId = req.teacherId;
  try {
    // First, find all classes where the teacher is present
    const teacherClasses = await Class.find({ teacher: teacherId }).select('_id');
    const classIds = teacherClasses.map(c => c._id);

    // Now, find assignments created by the teacher and associated with these classes
    const assignments = await Assignment.find({
      teacher: teacherId,
      class: { $in: classIds }
    }).populate('class');

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
