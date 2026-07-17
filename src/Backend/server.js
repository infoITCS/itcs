import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import jobsRoutes from './routes/jobs.js'
import uploadRoutes from './routes/uploadRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import diagRoutes from './routes/diagRoutes.js'
import { setDb, isReady } from './models/dbHelpers.js'
import { assertJwtSecretStrength } from './utils/validation.js'
import { buildSitemapXml, getSiteOrigin } from './utils/sitemap.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })
dotenv.config()

assertJwtSecretStrength()

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set. Create .env file with MONGO_URI=mongodb+srv://...')
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : process.env.NODE_ENV === 'production'
    ? ['https://itcs.com.pk', 'https://www.itcs.com.pk']
    : ['http://localhost:5173', 'http://localhost:5000']

const app = express()
app.set('trust proxy', 1)

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins[0] || '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: isReady() ? 'connected' : 'disconnected',
    mongoState: mongoose.connection.readyState,
    environment: process.env.NODE_ENV || 'development',
  })
})

const uploadsPath = path.join(__dirname, 'uploads')
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true })
}
app.use('/uploads', express.static(uploadsPath))

app.use('/api', (req, res, next) => {
  if (!isReady()) {
    return res.status(503).json({
      error: 'Database not connected yet. Try again in a few seconds.',
      mongoState: mongoose.connection.readyState,
    })
  }
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/jobsAdd', jobsRoutes)
app.use('/api/custom-blogs', blogRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact', contactRoutes)
app.use('/diag', diagRoutes)

// Dynamic sitemap (static pages + published blogs). Must be before express.static
// so it is not overridden by the built public/sitemap.xml in dist/.
const sendSitemap = async (req, res) => {
  try {
    const xml = await buildSitemapXml(getSiteOrigin(req))
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
    res.status(200).send(xml)
  } catch (error) {
    console.error('Sitemap generation error:', error)
    res.status(500).json({ error: 'Failed to generate sitemap' })
  }
}
app.get('/sitemap.xml', sendSitemap)
app.get('/api/sitemap.xml', sendSitemap)

const distPath = path.join(__dirname, '../../dist')
const indexHtmlPath = path.join(distPath, 'index.html')

if (existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.endsWith(`${path.sep}index.html`) || filePath.endsWith('/index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
          return
        }

        if (filePath.includes(`${path.sep}assets${path.sep}`) || filePath.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        }
      },
    }),
  )
}

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    })
    .then(() => {
      const db = mongoose.connection.client.db('ITCSwebsite')
      setDb(db)
      console.log('✅ MongoDB Connected —', db.databaseName)
    })
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message)
    })
} else {
  console.error('❌ MONGO_URI not set — API routes that need the database will return 503')
}

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS policy blocked this request.' })
  }

  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

app.get('/custom-blog/:slug', (req, res) => {
  res.redirect(301, `/${encodeURIComponent(req.params.slug)}`)
})

app.get('/blog/:slug', (req, res, next) => {
  if (/^\d+$/.test(req.params.slug)) {
    return next()
  }

  res.redirect(301, `/${encodeURIComponent(req.params.slug)}`)
})

const serviceRedirects = {
  '/services/cloud': '/cloud',
  '/services/cloud/design': '/cloud/design',
  '/services/cloud/migration': '/cloud/migration',
  '/services/cloud/security': '/cloud/security',
  '/services/cyber-security': '/cybersecurity',
  '/services/cyber-security/assessment': '/cybersecurity/assessment',
  '/cyber-security': '/cybersecurity',
  '/cyber-security/assessment': '/cybersecurity/assessment',
  '/services/consulting': '/consulting',
  '/services/enterprise-solutions': '/enterprise-solutions',
  '/services/it-services': '/it-services',
  '/services/network-solutions': '/network-solutions',
  '/services/network-solutions/design': '/network-solutions/design',
  '/services/network-solutions/security': '/network-solutions/security',
  '/services/network-solutions/support': '/network-solutions/support',
  '/services/web-development': '/web-development',
}

Object.entries(serviceRedirects).forEach(([from, to]) => {
  app.get(from, (req, res) => {
    res.redirect(301, to)
  })
})

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' })
  }

  if (!existsSync(indexHtmlPath)) {
    return res.status(503).send(
      'Frontend build missing. Run "npm run build" on the server, then restart the app.',
    )
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.sendFile(indexHtmlPath, (err) => {
    if (err) next(err)
  })
})

const isDirectRun = () => {
  if (!process.argv[1]) return false
  return import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
}

if (isDirectRun()) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ITCS server listening on http://0.0.0.0:${PORT}`)
  })
}

export default app
