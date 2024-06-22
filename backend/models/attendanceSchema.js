import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendanceRecords: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    present: {
      type: Boolean,
      required: true
    }
  }]
});

export default mongoose.model('Attendance', attendanceSchema);