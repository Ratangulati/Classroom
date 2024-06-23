import { Student } from '../models/studentSchema.js';
import { Class } from '../models/classSchema.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import mongoose from 'mongoose'

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
        message: 'Student not found',
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

export const getStudentClass = async (req, res, next) => {
  const { studentId } = req.params;
  console.log('Fetching class for student:', studentId);

  try {
    const student = await Student.findById(studentId);
    console.log('Student found:', student);

    if (!student) {
      console.log('Student not found');
      return res.status(404).json({ message: "Student not found" });
    }

    const populatedStudent = await student.populate('class');
    console.log('Populated student:', populatedStudent);

    if (!populatedStudent.class) {
      console.log('Student has no assigned class');
      return res.status(404).json({ message: "Student is not assigned to any class" });
    }

    res.status(200).json({
      success: true,
      class: populatedStudent.class
    });
  } catch (err) {
    console.error('Error fetching student class:', err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const createStudent = async (req, res, next) => {
  const { name, registrationNumber, password } = req.body;

  try {
    if (!name || !registrationNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, registration number, and password' });
    }

    const student = await Student.create({ name, registrationNumber, password });
    res.status(201).json({
      success: true,
      message: 'Student created!',
      student,
    });
  } catch (error) {
    console.error('Error adding student:', error);
    errorHandler(error, req, res, next);
  }
};

export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const { name, registrationNumber, password } = req.body;

  try {
    if (!name || !registrationNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, registration number, and password' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, { name, registrationNumber, password }, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated!',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Error updating student:', error);
    errorHandler(error, req, res, next);
  }
};

export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Remove student from associated classes
    await Class.updateMany(
      { students: id },
      { $pull: { students: id } }
    );

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    errorHandler(error, req, res, next);
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

    res.status(200).json({ 
      success: true, 
      student: { 
        _id: student._id, 
        name: student.name 
      } 
    });
  } catch (err) {
    next(err);
  }
};



export const addStudent = async (req, res, next) => {
  const { classId } = req.params;
  const { registrationNumber } = req.body;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    return res.status(400).json({ message: "Invalid class ID" });
  }

  if (!registrationNumber) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  try {
    const classDetails = await Class.findById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Find the student with the given registration number
    const existingStudent = await Student.findOne({ registrationNumber });
    if (!existingStudent) {
      return res.status(404).json({ message: "Student with this registration number not found" });
    }

    // Check if the student is already enrolled in the class
    if (classDetails.students.includes(existingStudent._id)) {
      return res.status(409).json({ message: "Student is already enrolled in this class" });
    }

    // Add the student to the class
    classDetails.students.push(existingStudent._id);
    await classDetails.save();

    const updatedClassDetails = await Class.findById(classId)
      .populate('students')
      .populate('teachers')
      .populate({
        path: 'subjects',
        populate: { path: 'teacher', model: 'Teacher' }
      });

    res.status(200).json({ success: true, message: "Student added to class", class: updatedClassDetails });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
  
  

// // export const createStudent = async (req, res, next) => {
// //   const { name, registrationNumber, class: studentClass, password } = req.body;

// //   try {
// //     if (!name || !registrationNumber || !studentClass || !password) {
// //       return handleValidationError('Please fill the form', 400);
// //     }
// //     const student = await Student.create({ name, registrationNumber, class: studentClass, password });
// //     res.status(200).json({
// //       success: true,
// //       message: 'Student created!',
// //       student,
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };


// export const createStudent = async (req, res, next) => {
//   const { name, registrationNumber, password } = req.body;
//   const { classId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(classId)) {
//     return res.status(400).json({ success: false, message: 'Invalid classId' });
//   }

//   try {
//     const student = await Student.create({ name, registrationNumber, class: classId, password });
//     res.status(200).json({
//       success: true,
//       message: 'Student created!',
//       student,
//     });
//   } catch (error) {
//     console.error('Error adding student:', error);
//     setErrorMessage(error.response?.data?.message || 'Failed to add student. Please try again.');
//   }
// };



// export const getAllStudents = async (req, res, next) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json({
//       success: true,
//       students,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getStudentById = async (req, res, next) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       student,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteStudent = async (req, res, next) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Student deleted successfully",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export const studentSignIn = async (req, res, next) => {
//   const { registrationNumber, password } = req.body;

//   try {
//     const student = await Student.findOne({ registrationNumber });

//     if (!student) {
//       return res.status(404).json({ success: false, message: 'Student not found' });
//     }

//     if (student.password !== password) {
//       return res.status(401).json({ success: false, message: 'Invalid password' });
//     }

//     res.status(200).json({ success: true, student });
//   } catch (err) {
//     next(err);
//   }
// };