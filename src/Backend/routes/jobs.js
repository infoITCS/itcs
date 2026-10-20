import express from 'express'
import * as db from '../models/dbHelpers.js'
import jobsSeedData from '../data/jobsSeedData.js'
import { requireAdmin, isAdminRequest } from '../middleware/auth.js'
import { toUrlSlug, isMongoObjectId } from '../utils/slugify.js'

const router = express.Router()

const withJobSlug = (job) => {
  if (!job) return job
  return { ...job, slug: job.slug || toUrlSlug(job.title) }
}

const isActiveJob = (job) => job?.isActive !== false

const trimStr = (value) => (typeof value === 'string' ? value.trim() : '')

const toNumberOrNull = (value) => {
  if (value === '' || value === null || value === undefined) return null
  const num = Number(value)
  return Number.isFinite(num) && num >= 0 ? num : null
}

const toPositiveInt = (value, fallback = 1) => {
  const num = Number(value)
  return Number.isInteger(num) && num > 0 ? num : fallback
}

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback
  return value === true || value === 'true' || value === 1 || value === '1'
}

const toListStr = (value) => {
  if (typeof value !== 'string') return ''
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
}

const toTagsStr = (value) => {
  if (typeof value !== 'string') return ''
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .join(', ')
}

const toDateOrNull = (value) => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const toHtmlStr = (value) => {
  if (typeof value !== 'string') return ''
  const normalized = value.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ')
  const text = normalized.replace(/<[^>]*>/g, ' ')
  return text.trim() === '' ? '' : normalized.trim()
}

const sanitizeJobInput = (body = {}) => {
  const {
    title,
    department,
    type,
    location,
    experience,
    education,
    openings,
    shiftTiming,
    isRemote,
    isActive,
    featured,
    salaryMin,
    salaryMax,
    salaryCurrency,
    salaryPeriod,
    applyDeadline,
    skills,
    jobDescription,
    keyHighlights,
    requirements,
    benefits,
    perks,
    aboutRole,
    responsibilities,
    qualifications,
  } = body

  const safeAboutRole = trimStr(aboutRole)

  return {
    title: trimStr(title),
    department: trimStr(department),
    type: trimStr(type) || 'Full-time',
    location: trimStr(location),
    experience: trimStr(experience) || 'Not specified',
    education: trimStr(education),
    openings: toPositiveInt(openings, 1),
    shiftTiming: trimStr(shiftTiming),
    isRemote: toBool(isRemote, false),
    isActive: toBool(isActive, true),
    featured: toBool(featured, false),
    salaryMin: toNumberOrNull(salaryMin),
    salaryMax: toNumberOrNull(salaryMax),
    salaryCurrency: trimStr(salaryCurrency) || 'PKR',
    salaryPeriod: trimStr(salaryPeriod) || 'Yearly',
    applyDeadline: toDateOrNull(applyDeadline),
    skills: toTagsStr(skills),
    jobDescription: toHtmlStr(jobDescription),
    keyHighlights: toListStr(keyHighlights),
    requirements: toListStr(requirements),
    benefits: toListStr(benefits),
    perks: toListStr(perks),
    aboutRole: safeAboutRole,
    responsibilities: trimStr(responsibilities),
    qualifications: trimStr(qualifications),
    description: safeAboutRole,
  }
}

const validateJobInput = (data) => {
  if (!data.title || !data.department || !data.location) {
    return 'Title, department, and location are required'
  }
  if (data.salaryMin !== null && data.salaryMax !== null && data.salaryMin > data.salaryMax) {
    return 'Minimum salary cannot be greater than maximum salary'
  }
  return null
}

const resolveUniqueJobSlug = async (title, excludeId = null) => {
  const base = toUrlSlug(title) || 'job'
  let slug = base
  let n = 1
  while (true) {
    const existing = await db.findJobBySlug(slug)
    if (!existing || (excludeId && String(existing._id) === String(excludeId))) {
      return slug
    }
    slug = `${base}-${n++}`
  }
}

const findJobByParam = async (param) => {
  if (isMongoObjectId(param)) {
    try {
      const byId = await db.findJobById(param)
      if (byId) return byId
    } catch {
      // fall through to slug lookup
    }
  }

  const bySlug = await db.findJobBySlug(param)
  if (bySlug) return bySlug

  const jobs = await db.findAllJobs()
  return jobs.find((job) => (job.slug || toUrlSlug(job.title)) === param) || null
}

router.post('/seed/init', requireAdmin, async (req, res) => {
  try {
    const existingJobs = await db.findAllJobs()

    if (existingJobs.length > 0) {
      return res.status(400).json({
        message: 'Database already has jobs. Clear them first if you want to reseed.',
        count: existingJobs.length,
      })
    }

    const savedJobs = await Promise.all(
      jobsSeedData.map(async (j) =>
        db.createJob({
          ...j,
          slug: await resolveUniqueJobSlug(j.title),
        })
      )
    )
    res.status(201).json({
      message: `Successfully seeded ${savedJobs.length} jobs`,
      jobs: savedJobs.map(withJobSlug),
    })
  } catch (err) {
    console.error('Error seeding jobs:', err)
    res.status(500).json({ message: 'Failed to seed jobs', error: err.message })
  }
})

router.delete('/seed/clear', requireAdmin, async (req, res) => {
  try {
    const jobs = await db.findAllJobs()
    await Promise.all(jobs.map((j) => db.deleteJobById(String(j._id))))
    res.json({
      message: `Successfully deleted ${jobs.length} jobs`,
    })
  } catch (err) {
    console.error('Error clearing jobs:', err)
    res.status(500).json({ message: 'Failed to clear jobs' })
  }
})

router.post('/', requireAdmin, async (req, res) => {
  try {
    const data = sanitizeJobInput(req.body)
    const error = validateJobInput(data)
    if (error) {
      return res.status(400).json({ message: error })
    }

    const slug = await resolveUniqueJobSlug(data.title)
    const savedJob = await db.createJob({ ...data, slug })
    res.status(201).json({ message: 'Job created successfully', job: withJobSlug(savedJob) })
  } catch (err) {
    console.error('Error creating job:', err)
    res.status(500).json({ message: 'Failed to create job' })
  }
})

router.get('/', async (req, res) => {
  try {
    const jobs = await db.findAllJobs()
    const wantsAll = req.query.all === 'true' || req.query.all === '1'
    const visible = wantsAll && (await isAdminRequest(req)) ? jobs : jobs.filter(isActiveJob)
    res.json(visible.map(withJobSlug))
  } catch (err) {
    console.error('Error fetching jobs:', err)
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const job = await findJobByParam(id)

    if (!job || (!isActiveJob(job) && !(await isAdminRequest(req)))) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(withJobSlug(job))
  } catch (err) {
    console.error('Error fetching job:', err)
    res.status(500).json({ message: 'Failed to fetch job' })
  }
})

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const existing = await findJobByParam(id)
    if (!existing) {
      return res.status(404).json({ message: 'Job not found' })
    }

    const data = sanitizeJobInput(req.body)
    const error = validateJobInput(data)
    if (error) {
      return res.status(400).json({ message: error })
    }

    const jobId = String(existing._id)
    const titleChanged = data.title !== existing.title
    const slug = titleChanged
      ? await resolveUniqueJobSlug(data.title, jobId)
      : existing.slug || (await resolveUniqueJobSlug(data.title, jobId))

    const updatedJob = await db.updateJobById(jobId, { ...data, slug })

    res.json({ message: 'Job updated successfully', job: withJobSlug(updatedJob) })
  } catch (err) {
    console.error('Error updating job:', err)
    res.status(500).json({ message: 'Failed to update job' })
  }
})

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const job = await findJobByParam(id)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    await db.deleteJobById(String(job._id))
    res.json({ message: 'Job deleted successfully' })
  } catch (err) {
    console.error('Error deleting job:', err)
    res.status(500).json({ message: 'Failed to delete job' })
  }
})

export default router
