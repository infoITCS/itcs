import express from 'express'
import * as db from '../models/dbHelpers.js'
import jobsSeedData from '../data/jobsSeedData.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/seed/init', requireAdmin, async (req, res) => {
  try {
    const existingJobs = await db.findAllJobs()

    if (existingJobs.length > 0) {
      return res.status(400).json({
        message: 'Database already has jobs. Clear them first if you want to reseed.',
        count: existingJobs.length,
      })
    }

    const savedJobs = await Promise.all(jobsSeedData.map((j) => db.createJob(j)))
    res.status(201).json({
      message: `Successfully seeded ${savedJobs.length} jobs`,
      jobs: savedJobs,
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
    const {
      title,
      department,
      type,
      location,
      experience,
      aboutRole,
      responsibilities,
      qualifications,
    } = req.body

    if (!title || !department || !location) {
      return res.status(400).json({ message: 'Title, department, and location are required' })
    }

    const savedJob = await db.createJob({
      title,
      department,
      type: type || 'Full-time',
      location,
      experience: experience || 'Not specified',
      aboutRole: aboutRole || '',
      responsibilities: responsibilities || '',
      qualifications: qualifications || '',
      description: aboutRole || '',
    })
    res.status(201).json({ message: 'Job created successfully', job: savedJob })
  } catch (err) {
    console.error('Error creating job:', err)
    res.status(500).json({ message: 'Failed to create job' })
  }
})

router.get('/', async (req, res) => {
  try {
    const jobs = await db.findAllJobs()
    res.json(jobs)
  } catch (err) {
    console.error('Error fetching jobs:', err)
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const job = await db.findJobById(id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
  } catch (err) {
    console.error('Error fetching job:', err)
    res.status(500).json({ message: 'Failed to fetch job' })
  }
})

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const job = await db.findJobById(id)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    await db.deleteJobById(id)
    res.json({ message: 'Job deleted successfully' })
  } catch (err) {
    console.error('Error deleting job:', err)
    res.status(500).json({ message: 'Failed to delete job' })
  }
})

export default router
