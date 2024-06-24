import { Assignment } from "../models/assignmentSchema.js";
import { Class } from "../models/classSchema.js"; 
import { Student } from '../models/studentSchema.js';

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
    const teacherClasses = await Class.find({ teachers: teacherId }).select('_id');
    const classIds = teacherClasses.map(c => c._id);

    const assignments = await Assignment.find({
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

export const getAssignmentsByClassId = async (req, res, next) => {
  const { classId } = req.params;
  try {
    const assignments = await Assignment.find({ class: classId }).populate('class');
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

export const getAssignmentsByStudentId = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate('class');

    if (!student) {
      console.error('Student not found');
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (!student.class) {
      console.error('Student class not found');
      return res.status(404).json({ success: false, message: 'Student class not found' });
    }

    const assignments = await Assignment.find({
      class: student.class._id,
    }).populate('class');

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    next(error);
  }
};