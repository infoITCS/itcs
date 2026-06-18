import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import jobsRoutes from './routes/jobs.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { setDb } from './models/dbHelpers.js'

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

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/jobsAdd', jobsRoutes)
app.use('/api/custom-blogs', blogRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact', contactRoutes)

app.use(express.static(path.join(__dirname, '../../dist')));

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    family: 4,
  })
  .then(() => {
    console.log('connection name:', mongoose.connection.name)
    console.log('client exists:', !!mongoose.connection.client)
    const db = mongoose.connection.client.db('ITCSwebsite')
    console.log('got db:', db.databaseName)
    setDb(db)
    console.log('✅ MongoDB Connected Successfully')
    db.collection('customblogs').countDocuments().then(c => console.log('customblogs count:', c)).catch(e => console.log('count error:', e.message))
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

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
