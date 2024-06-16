import { Events } from "../models/eventsSchema.js"
import { handleValidationError  } from "../middlewares/errorHandler.js";

export const createEvent = async (req, res, next) => {
    const { events } = req.body;

    try {
        if (!events) {
            handleValidationError("Please fill the form", 400);
        }
        const event = await Events.create({name, registrationNumber, grade});
        res.status(200).json({
            success: true,
            message: "Event is created!",
            event
        })
    } catch (err) {
        next(err);
    }
}

export const getAllEvents = async (req, res, next) => {
    try {
        const event = await Events.find();
        res.status(200).json({
            sucess: true,
            event,
        })
    } catch (err) {
        next(err);
    }
} 