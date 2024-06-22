import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: String,
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

  
export const Subject = mongoose.model('Subject', subjectSchema);

  