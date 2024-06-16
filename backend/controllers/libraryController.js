import { Book } from "../models/librarySchema.js"
import { handleValidationError  } from "../middlewares/errorHandler.js";

export const createBook = async (req, res, next) => {
    const {bookname, author} = req.body;

    try {
        if (!bookname || !author) {
            handleValidationError("Please fill the form", 400);
        }
        const books = await Book.create({name, registrationNumber, grade});
        res.status(200).json({
            success: true,
            message: "Book created!",
            books
        })
    } catch (err) {
        next(err);
    }
}

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            sucess: true,
            books,
        })
    } catch (err) {
        next(err);
    }
} 