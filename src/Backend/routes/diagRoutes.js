import express from 'express'
import nodemailer from 'nodemailer'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/diag-email', requireAdmin, async (req, res) => {
  const result = {
    emailUser: process.env.EMAIL_USER ? 'SET' : 'NOT SET',
    emailPass: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
    contactSmtp: process.env.CONTACT_SMTP_USER ? 'SET' : 'NOT SET',
    hrmSmtp: process.env.HRM_SMTP_USER ? 'SET' : 'NOT SET',
    verifySuccess: false,
    error: null,
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.CONTACT_SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.CONTACT_SMTP_USER,
        pass: process.env.CONTACT_SMTP_PASS,
      },
    })

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) reject(error)
        else resolve(success)
      })
    })

    result.verifySuccess = true
  } catch (error) {
    result.error = {
      message: error.message,
      code: error.code,
    }
  }

  res.json(result)
})

export default router
