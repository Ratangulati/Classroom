import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  }],
  subjects: [{
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  }]
});

export const Class = mongoose.model('Class', classSchema);
