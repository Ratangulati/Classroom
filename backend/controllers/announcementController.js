import { handleValidationError } from "../middlewares/errorHandler.js";
import { Announcement } from "../models/announcemntSchema.js";
import { Student } from '../models/studentSchema.js';


export const createAnnouncement = async (req, res, next) => {
  console.log(req.body);
  const { announcement } = req.body;
  try {
      if (!announcement ) {
        handleValidationError("Please Fill Form!", 400);
  }
  const announcements = await Announcement.create({ announcement});
  res.status(200).json({
    success: true,
    message: "Announcement Created!",
    announcements,
  });
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcement = await Announcement.find();
    console.log('Fetched Announcements:', announcement);
    res.status(200).json({
      success: true,
      announcement,
    }); 
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Announcement:', error);
    errorHandler(error, req, res, next);
  }
};
