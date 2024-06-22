import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// controllers/studentController.js
export const createStudent = async (req, res, next) => {
  const { name, registrationNumber, class: studentClass, password } = req.body;

  try {
    if (!name || !registrationNumber || !studentClass || !password) {
      return handleValidationError('Please fill the form', 400);
    }
    const student = await Student.create({ name, registrationNumber, class: studentClass, password });
    res.status(200).json({
      success: true,
      message: 'Student created!',
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const studentSignIn = async (req, res, next) => {
  const { registrationNumber, password } = req.body;

  try {
    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (student.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, student });
  } catch (err) {
    next(err);
  }
};