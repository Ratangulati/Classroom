import Attendance from "../models/attendanceSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import { Class } from "../models/classSchema.js";
import { Student } from "../models/studentSchema.js";

export const markAttendance = async (req, res, next) => {
  const { teacherId, classId } = req.params;
  const { date, attendance } = req.body;
  
  try {
    // Verify that the teacher is associated with this class
    const classDoc = await Class.findOne({ _id: classId, teachers: teacherId });
    if (!classDoc) {
      return handleValidationError("You are not authorized to submit attendance for this class", 403);
    }

    if (!date || !attendance || typeof attendance !== 'object' || Object.keys(attendance).length === 0) {
      return handleValidationError("Attendance data is missing or invalid!", 400);
    }

    // Check if attendance for this date already exists
    let attendanceDoc = await Attendance.findOne({ class: classId, date: new Date(date) });

    const attendanceRecords = Object.keys(attendance).map(studentId => ({
      student: studentId,
      present: attendance[studentId]
    }));

    if (attendanceDoc) {
      // Update existing attendance
      attendanceDoc.attendanceRecords = attendanceRecords;
      await attendanceDoc.save();
    } else {
      // Create new attendance document
      attendanceDoc = new Attendance({
        class: classId,
        date: new Date(date),
        attendanceRecords
      });
      await attendanceDoc.save();
    }

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully!",
      attendanceDoc
    });
  } catch (err) {
    next(err);
  }
};

export const getAttendance = async (req, res, next) => {
  const { teacherId, classId } = req.params;
  const { date } = req.query;
  
  try {
    // Verify that the teacher is associated with this class
    const classDoc = await Class.findOne({ _id: classId, teachers: teacherId });
    if (!classDoc) {
      return handleValidationError("You are not authorized to view attendance for this class", 403);
    }

    // Fetch attendance for the specified date
    const attendanceDoc = await Attendance.findOne({ 
      class: classId, 
      date: new Date(date) 
    }).populate('attendanceRecords.student', 'name registrationNumber');

    if (!attendanceDoc) {
      return handleValidationError("No attendance record found for the specified date", 404);
    }

    res.status(200).json({
      success: true,
      attendanceDoc
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAttendance = async (req, res, next) => {
  const { teacherId, classId } = req.params;
  
  try {
    // Verify that the teacher is associated with this class
    const classDoc = await Class.findOne({ _id: classId, teachers: teacherId });
    if (!classDoc) {
      return handleValidationError("You are not authorized to view attendance for this class", 403);
    }

    const attendanceRecords = await Attendance.find({ class: classId })
      .populate('attendanceRecords.student', 'name registrationNumber');
    
    res.status(200).json({
      success: true,
      attendanceRecords
    });
  } catch (err) {
    next(err);
  }
};

export const getStudentAttendance = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return handleValidationError("Student not found", 404);
    }

    const attendanceRecords = await Attendance.find({ 'attendanceRecords.student': studentId })
      .populate('attendanceRecords.student', 'name registrationNumber');

    const studentAttendance = attendanceRecords.map(record => ({
      _id: record._id,
      date: record.date,
      present: record.attendanceRecords.find(ar => ar.student._id.equals(studentId)).present,
    }));

    res.status(200).json({
      success: true,
      attendanceRecords: studentAttendance
    });
  } catch (err) {
    next(err);
  }
};