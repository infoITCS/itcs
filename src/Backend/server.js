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

const distPath = path.join(__dirname, '../../dist')
const indexHtmlPath = path.join(distPath, 'index.html')

if (existsSync(distPath)) {
  app.use(express.static(distPath))
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
  res.redirect(301, `/blog/${encodeURIComponent(req.params.slug)}`)
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
