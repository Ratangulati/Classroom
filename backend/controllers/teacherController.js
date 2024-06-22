import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { Class } from "../models/classSchema.js";

export const createTeacher = async (req, res, next) => {
  const { name, email, subject, password } = req.body;

  try {
    if (!name || !email || !subject || !password) {
      return handleValidationError('Please fill the form', 400);
    }
    const teacher = await Teacher.create({ name, email, subject, password });
    res.status(200).json({
      success: true,
      message: 'Teacher created!',
      teacher,
    });
  } catch (err) {
    next(err);
  }
};


export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("classes");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (err) {
    console.error("Error fetching teacher by ID:", err);  // Log the error for debugging
    next(err);
  }
};


export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Add teacher to class
export const addTeacherToClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { teachers: teacherId } },
      { new: true }
    );

    res.status(200).json({ class: updatedClass });
  } catch (error) {
    console.error('Error adding teacher to class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove teacher from class
export const removeTeacherFromClass = async (req, res, next) => {
  const { classId, teacherId } = req.params;

  try {
    const classDetails = await Class.findByIdAndUpdate(
      classId,
      {
        $pull: { teachers: teacherId },
      },
      { new: true }
    ).populate("students")
      .populate("teachers");

    if (!classDetails) {
      return res.status(404).json({ message: "Class or Teacher not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Teacher removed", classDetails });
  } catch (error) {
    next(error);
  }
};

// Get all classes for a specific teacher
export const getClassesForTeacher = async (req, res, next) => {
  const { teacherId } = req.params;

  try {
    const classes = await Class.find({ teachers: teacherId })
      .populate("students")
      .populate("teachers");

    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes for teacher:", error);
    next(error);
  }
};


export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (teacher.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, teacher: { _id: teacher._id, name: teacher.name } });
  } catch (err) {
    next(err);
  }
};
