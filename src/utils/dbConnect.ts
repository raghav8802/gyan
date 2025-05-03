import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI as string;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  return mongoose.connect(uri);
};

export default dbConnect; 