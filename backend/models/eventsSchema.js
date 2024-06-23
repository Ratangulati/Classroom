import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  
});

export const Event = mongoose.model('Event', eventsSchema);
