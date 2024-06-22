import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notice = mongoose.model('NNoticeotice', noticeSchema);


