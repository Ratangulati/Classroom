import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
