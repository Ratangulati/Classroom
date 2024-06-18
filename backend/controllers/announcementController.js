import { handleValidationError } from "../middlewares/errorHandler.js";
import { Announcement } from "../models/announcemntSchema.js";

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
    const announcements = await Announcement.find();
    res.status(200).json({
    success: true,
    announcements,
  }); 
  } catch (err) {
    next(err);
  }
};

