import { Class } from "../models/classSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";


export const createClass = async (req, res, next) => {
  const { class: className } = req.body;
  try {
    if (!className) {
      return handleValidationError("Please Fill Form!", 400);
    }
    const newClass = await Class.create({ class: className });
    res.status(200).json({
      success: true,
      message: "Class Created!",
      newClass
    });
  } catch (err) {
    next(err);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().populate('students').populate('teachers');
    res.status(200).json({
      success: true,
      classes,
    });
  } catch (err) {
    next(err);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classDetails = await Class.findById(classId)
      .populate('students')
      .populate('teachers', 'name email') 
      .populate({
        path: 'subjects',
        populate: { path: 'teacher', model: 'Teacher', select: 'name email' } 
      });

    if (!classDetails) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      class: classDetails,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteClass = async (req, res, next) => {
  const { classId } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Class deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    next(error);
  }
};

// Student
// export const addStudent = async (req, res, next) => {
//   const { classId } = req.params;
//   console.log('Received classId:', classId);
//   const { registrationNumber } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(classId)) {
//     return res.status(400).json({ message: "Invalid class ID" });
//   }

//   try {
//     const classDetails = await Class.findById(classId);
//     if (!classDetails) {
//       return res.status(404).json({ message: "Class not found" });
//     }

//     const student = await Student.findOne({ registrationNumber });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     if (classDetails.students.includes(student._id)) {
//       return res.status(400).json({ message: "Student already exists in class" });
//     }
//     classDetails.students.push(student._id);
//     await classDetails.save();

//     const updatedClassDetails = await Class.findById(classId)
//       .populate('students')
//       .populate({
//         path: 'subjects',
//         populate: { path: 'teacher', model: 'Teacher' }
//       });

//     res.status(200).json({ success: true, message: "Student added", class: updatedClassDetails });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteStudent = async (req, res, next) => {
  const { classId, studentId } = req.params;

  try {
    const classDetails = await Class.findByIdAndUpdate(classId, {
      $pull: { students: studentId },
    }, { new: true }).populate('students').populate('teachers');

    if (!classDetails) {
      return res.status(404).json({ message: "Class or Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted", classDetails });
  } catch (error) {
    next(error);
  }
};


//Teacher
export const addTeacher = async (req, res, next) => {
  const { classId } = req.params;
  const { email } = req.body;

  try {
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    if (classDetails.teachers.includes(teacher._id)) {
      return res.status(400).json({ message: "Teacher already exists in class" });
    }
    classDetails.teachers.push(teacher._id);
    await classDetails.save();

    const updatedClassDetails = await Class.findById(classId)
      .populate('students')
      .populate('teachers')
      .populate({
        path: 'subjects',
        populate: { path: 'teacher', model: 'Teacher' }
      });

    res.status(200).json({ success: true, message: "Teacher added", class: updatedClassDetails });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  const { classId, teacherId } = req.params;

  try {
    if (!classId || !teacherId) {
      return res.status(400).json({ message: "Invalid class ID or teacher ID" });
    }

    const classDetails = await Class.findByIdAndUpdate(classId, {
      $pull: { teachers: teacherId },
    }, { new: true }).populate('students').populate('teachers');

    if (!classDetails) {
      return res.status(404).json({ message: "Class or Teacher not found" });
    }

    res.status(200).json({ success: true, message: "Teacher deleted", classDetails });
  } catch (error) {
    console.error("Error in deleteTeacher:", error);
    next(error);
  }
};

export const getClassTeachers = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const classDetails = await Class.findById(classId).populate('teachers', 'name email');

    if (!classDetails) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      teachers: classDetails.teachers,
    });
  } catch (err) {
    next(err);
  }
};



export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().select('name email');
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const classes = await Class.find({ teachers: teacherId });

    res.status(200).json({ classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



//subject 
export const addSubject = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { name, teacherId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { subjects: { name, teacher: teacherId } } },
      { new: true }
    ).populate('students')
      .populate('teachers')
      .populate({
        path: 'subjects',
        populate: { path: 'teacher', model: 'Teacher' }
      });

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ success: true, message: "Subject added", class: updatedClass });
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req, res, next) => {
  const { classId, subjectId } = req.params;

  try {
    const classDetails = await Class.findByIdAndUpdate(classId, {
      $pull: { subjects: { _id: subjectId } }
    }, { new: true });

    if (!classDetails) {
      return res.status(404).json({ message: "Class or Subject not found" });
    }

    res.status(200).json({ success: true, message: "Subject deleted from class", classDetails });
  } catch (error) {
    next(error);
  }
};