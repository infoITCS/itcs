import mongoose from 'mongoose';

mongoose.set('bufferTimeoutMS', 120000);

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  department: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  location: { type: String, required: true },
  experience: { type: String, default: 'Not specified' },
  education: { type: String, default: '' },
  openings: { type: Number, default: 1 },
  shiftTiming: { type: String, default: '' },
  isRemote: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  salaryMin: { type: Number, default: null },
  salaryMax: { type: Number, default: null },
  salaryCurrency: { type: String, default: 'PKR' },
  salaryPeriod: { type: String, default: 'Yearly' },
  applyDeadline: { type: Date, default: null },
  skills: { type: String, default: '' },
  jobDescription: { type: String, default: '' },
  keyHighlights: { type: String, default: '' },
  requirements: { type: String, default: '' },
  benefits: { type: String, default: '' },
  perks: { type: String, default: '' },
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
