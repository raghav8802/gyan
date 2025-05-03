import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: String,
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  bio: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema); 