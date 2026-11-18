import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from '../src/Backend/routes/authRoutes.js';
import jobRoutes from '../src/Backend/routes/jobRoutes.js';
import blogRoutes from '../src/Backend/routes/blogRoutes.js';
import adminRoutes from '../src/Backend/routes/adminRoutes.js';
import jobsRoutes from '../src/Backend/routes/jobs.js';
import contactRoutes from '../src/Backend/routes/contactRoutes.js';
import { setDb } from '../src/Backend/models/dbHelpers.js';
import { assertJwtSecretStrength } from '../src/Backend/utils/validation.js';
import { buildSitemapXml, getSiteOrigin } from '../src/Backend/utils/sitemap.js';
import {
  NOINDEX_HEADER,
  getFrontendStatus,
  isMediaPath,
} from '../src/Backend/utils/seoRouting.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

let mongooseConnection = null;
let connectingPromise = null;
let dbInitialized = false;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['https://itcs.com.pk', 'https://www.itcs.com.pk', 'http://localhost:5173', 'http://localhost:5000'];

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
  const pathname = req.path || '';
  return pathname === '/sitemap.xml' || pathname === '/api/sitemap.xml';
};

const canSkipDatabase = (req) =>
  isSitemapPath(req) ||
  req.path === '/robots.txt' ||
  isMediaPath(req.path) ||
  /\.[a-z0-9]{2,8}$/i.test(req.path);

app.use(async (req, res, next) => {
  try {
    await getMongoConnection();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (canSkipDatabase(req)) {
      return next();
    }
    res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
    return res.status(503).json({ error: 'Database connection failed' });
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

// Dynamic sitemap: static pages + all published blog slugs + tags (auto-updates).
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

// Direct media URLs are assets, never indexable pages.
app.use('/uploads', (req, res) => {
  res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
  res.status(404).json({ error: 'Media not found' });
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`) || filePath.includes('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }));
}

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

// Frontend deep links: the status comes from the database, so a missing blog,
// tag or job returns a real 404 instead of a 200 Soft 404 SPA shell.
app.get('*', async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
    return res.status(404).json({ error: 'API route not found' });
  }

  if (!fs.existsSync(indexHtmlPath)) {
    return res.status(503).send('Frontend build missing.');
  }

  try {
    const status = await getFrontendStatus(req.path);
    if (status !== 200) res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(status).sendFile(indexHtmlPath, (err) => {
      if (err) next(err);
    });
  } catch {
    res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
    return res.status(503).send('Service temporarily unavailable');
  }
});

app.use((req, res) => {
  res.setHeader('X-Robots-Tag', NOINDEX_HEADER);
  res.status(404).json({ error: 'Route not found' });
});

export default async function handler(req, res) {
  return app(req, res);
}
