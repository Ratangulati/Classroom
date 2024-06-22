import { Event } from '../models/eventsSchema.js';
import { handleValidationError } from '../middlewares/errorHandler.js';

export const createEvent = async (req, res, next) => {
  const { title, date, description } = req.body;

  try {
    if (!title || !date || !description) {
      handleValidationError('Please provide title, date, and description', 400);
    }

    const event = await Event.create({ title, date, description });
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    next(error);
  }
};
