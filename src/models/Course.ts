import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  image: { type: String, required: true },
  modules: { type: String, required: true },
  yourLearning: { type: String, required: true },
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course; 