import { Student } from "../models/studentSchema.js"
import { handleValidationError  } from "../middlewares/errorHandler.js";

export const createStudent = async (req, res, next) => {
    const {name, registrationNumber, grade} = req.body;

    try {
        if (!name || !registrationNumber || !grade) {
            handleValidationError("Please fill the form", 400);
        }
        const student = await Student.create({name, registrationNumber, grade});
        res.status(200).json({
            success: true,
            message: "Student created!",
            student
        })
    } catch (err) {
        next(err);
    }
}

export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            sucess: true,
            students,
        })
    } catch (err) {
        next(err);
    }
} 