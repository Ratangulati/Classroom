import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

export const Teacher = mongoose.model('Teacher', teacherSchema);