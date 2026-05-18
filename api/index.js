import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from '../src/Backend/routes/authRoutes.js';
import jobRoutes from '../src/Backend/routes/jobRoutes.js';
import blogRoutes from '../src/Backend/routes/blogRoutes.js';
import adminRoutes from '../src/Backend/routes/adminRoutes.js';
import jobsRoutes from '../src/Backend/routes/jobs.js';
import uploadRoutes from '../src/Backend/routes/uploadRoutes.js';

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobsAdd', jobsRoutes);
app.use('/api/custom-blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);

// Catch-all for non-API routes - return 404
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Vercel serverless handler
export default async function handler(req, res) {
  // Ensure MongoDB connection before handling requests
  try {
    await getMongoConnection();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
  
  // Let express handle the request
  return app(req, res);
}
