import mongoose from 'mongoose';

export const dbConnection = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  }
};
