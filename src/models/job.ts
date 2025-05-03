// src/models/Job.ts
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  applyStartDate: { type: Date, required: true },
  applyEndDate: { type: Date, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'internship'], required: true },
  sector: { type: String, enum: ['government', 'private'], required: true },
  eligibility: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;