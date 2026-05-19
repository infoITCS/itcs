import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  location: { type: String, required: true },
  experience: { type: String, default: 'Not specified' },
  aboutRole: { type: String, default: '' },
  responsibilities: { type: String, default: '' },
  qualifications: { type: String, default: '' },
  description: { type: String, default: '' }, // Legacy support
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Job', jobSchema);
