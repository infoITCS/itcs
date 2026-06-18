import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })

const app = express()

app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true, limit: '200mb' }))

const uploadsPath = path.join(__dirname, 'uploads');
console.log('Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

app.use(express.static(path.join(__dirname, '../../dist')));

mongoose.set('bufferTimeoutMS', 120000);
await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  family: 4,
});
console.log('✅ MongoDB Connected Successfully');

const [authRoutes, jobRoutes, blogRoutes, adminRoutes, jobsRoutes, uploadRoutes, contactRoutes] = await Promise.all([
  import('./routes/authRoutes.js'),
  import('./routes/jobRoutes.js'),
  import('./routes/blogRoutes.js'),
  import('./routes/adminRoutes.js'),
  import('./routes/jobs.js'),
  import('./routes/uploadRoutes.js'),
  import('./routes/contactRoutes.js'),
]);

app.use('/api/auth', authRoutes.default)
app.use('/api/jobs', jobRoutes.default)
app.use('/api/blogs', blogRoutes.default)
app.use('/api/admin', adminRoutes.default)
app.use('/api/jobsAdd', jobsRoutes.default)
app.use('/api/custom-blogs', blogRoutes.default)
app.use('/api/upload', uploadRoutes.default)
app.use('/api/contact', contactRoutes.default)

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
