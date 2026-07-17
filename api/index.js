import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from '../src/Backend/routes/authRoutes.js';
import jobRoutes from '../src/Backend/routes/jobRoutes.js';
import blogRoutes from '../src/Backend/routes/blogRoutes.js';
import adminRoutes from '../src/Backend/routes/adminRoutes.js';
import jobsRoutes from '../src/Backend/routes/jobs.js';
import contactRoutes from '../src/Backend/routes/contactRoutes.js';
import { setDb } from '../src/Backend/models/dbHelpers.js';
import { assertJwtSecretStrength } from '../src/Backend/utils/validation.js';
import { buildSitemapXml, getSiteOrigin } from '../src/Backend/utils/sitemap.js';

let mongooseConnection = null;
let connectingPromise = null;
let dbInitialized = false;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:5000'];

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

  if (!dbInitialized) {
    const db = mongooseConnection.connection.client.db('ITCSwebsite');
    setDb(db);
    dbInitialized = true;
  }

  return mongooseConnection;
};

assertJwtSecretStrength();

const app = express();
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Long blogs often include base64 cover images; keep under MongoDB's 16MB doc limit
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const isSitemapPath = (req) => {
  const path = req.path || '';
  return path === '/sitemap.xml' || path === '/api/sitemap.xml';
};

app.use(async (req, res, next) => {
  try {
    await getMongoConnection();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Sitemap can still return static pages without DB
    if (isSitemapPath(req)) {
      return next();
    }
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const sendSitemap = async (req, res) => {
  try {
    const xml = await buildSitemapXml(getSiteOrigin(req));
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
};

// Dynamic sitemap: static pages + all published blog slugs (auto-updates).
app.get('/sitemap.xml', sendSitemap);
app.get('/api/sitemap.xml', sendSitemap);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobsAdd', jobsRoutes);
app.use('/api/custom-blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api/upload', (req, res) => {
  res.status(501).json({ error: 'File uploads not supported on Vercel. Use cloud storage like AWS S3, Cloudinary, or Vercel Blob.' });
});

app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'ok',
    database: isConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS policy blocked this request.' });
  }

  if (err.type === 'entity.too.large' || err.status === 413) {
    return res.status(413).json({
      message: 'Blog is too large. Please use a smaller image or reduce content length.',
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

export default async function handler(req, res) {
  return app(req, res);
}
