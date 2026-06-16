import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from '../src/Backend/routes/authRoutes.js';
import jobRoutes from '../src/Backend/routes/jobRoutes.js';
import blogRoutes from '../src/Backend/routes/blogRoutes.js';
import adminRoutes from '../src/Backend/routes/adminRoutes.js';
import jobsRoutes from '../src/Backend/routes/jobs.js';
import contactRoutes from '../src/Backend/routes/contactRoutes.js';

// MongoDB connection singleton for serverless
let mongooseConnection = null;
let connectingPromise = null;

const getMongoConnection = async () => {
  if (mongooseConnection) {
    return mongooseConnection;
  }
  
  if (connectingPromise) {
    return connectingPromise;
  }
  
  connectingPromise = mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });
  
  mongooseConnection = await connectingPromise;
  connectingPromise = null;
  
  return mongooseConnection;
};

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// MongoDB connection middleware
app.use(async (req, res, next) => {
  try {
    await getMongoConnection();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobsAdd', jobsRoutes);
app.use('/api/custom-blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

// Upload route - disabled on Vercel (use cloud storage instead)
app.use('/api/upload', (req, res) => {
  res.status(501).json({ error: 'File uploads not supported on Vercel. Use cloud storage like AWS S3, Cloudinary, or Vercel Blob.' });
});

// Health check
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'ok',
    database: isConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Global error handler - catch unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Catch-all for non-API routes - return 404
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Vercel serverless handler
export default async function handler(req, res) {
  return app(req, res);
}
