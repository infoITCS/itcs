import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { rateLimit } from '../middleware/rateLimit.js'
import {
  escapeHtml,
  isValidEmail,
  parsePdfFromBase64,
  sanitizeEmailHeader,
  sanitizeFilename,
  trimString,
} from '../utils/validation.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config({ path: path.join(__dirname, '../.env') })
const router = express.Router()

const HRM_RECIPIENT = process.env.HRM_EMAIL_TO || 'hrm@itcs.com.pk'
const HRM_SMTP_USER = process.env.HRM_SMTP_USER || process.env.EMAIL_USER
const HRM_SMTP_PASS = process.env.HRM_SMTP_PASS || process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
  host: process.env.HRM_SMTP_HOST || process.env.EMAIL_HOST || 'smtp.office365.com',
  port: parseInt(process.env.HRM_SMTP_PORT || process.env.EMAIL_PORT || '587', 10),
  secure: false,
  auth: {
    user: HRM_SMTP_USER,
    pass: HRM_SMTP_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2',
  },
})

const applyRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyPrefix: 'job-apply',
})

router.post('/apply', applyRateLimit, async (req, res) => {
  try {
    const fullName = trimString(req.body.fullName, 120)
    const email = trimString(req.body.email, 254)
    const phone = trimString(req.body.phone, 40)
    const preferredLocation = trimString(req.body.preferredLocation, 80)
    const coverLetter = trimString(req.body.coverLetter || '', 10000)
    const experience = trimString(req.body.experience, 200)
    const linkedin = trimString(req.body.linkedin || '', 500)
    const jobTitle = trimString(req.body.jobTitle || 'Not Specified', 200)
    const jobDepartment = trimString(req.body.jobDepartment || '', 120)
    const jobLocation = trimString(req.body.jobLocation || '', 120)
    const resume = req.body.resume
    const resumeName = sanitizeFilename(req.body.resumeName)

    if (!fullName || !email || !phone || !preferredLocation || !experience) {
      return res.status(400).json({ message: 'All required fields must be filled.' })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    if (!resume) {
      return res.status(400).json({ message: 'Resume (PDF) is required.' })
    }

    if (!HRM_SMTP_USER || !HRM_SMTP_PASS) {
      console.error('Job application: HRM_SMTP_USER or HRM_SMTP_PASS not configured')
      return res.status(500).json({ message: 'Email service is not configured. Please try again later.' })
    }

    let buffer
    try {
      buffer = parsePdfFromBase64(resume)
    } catch (pdfError) {
      return res.status(400).json({ message: pdfError.message })
    }

    const safeFullName = escapeHtml(fullName)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeExperience = escapeHtml(experience)
    const safePreferredLocation = escapeHtml(preferredLocation)
    const safeJobTitle = escapeHtml(jobTitle)
    const safeJobDepartment = escapeHtml(jobDepartment || 'N/A')
    const safeJobLocation = escapeHtml(jobLocation || 'N/A')
    const safeLinkedin = linkedin ? escapeHtml(linkedin) : ''
    const safeCoverLetter = coverLetter ? escapeHtml(coverLetter).replace(/\n/g, '<br>') : ''

    const mailOptions = {
      from: `"ITCS Careers" <${HRM_SMTP_USER}>`,
      to: HRM_RECIPIENT,
      replyTo: sanitizeEmailHeader(email),
      subject: sanitizeEmailHeader(`New Application: ${jobTitle} - ${fullName}`),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4a9eff 0%, #357abd 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #4a9eff; }
            .value { margin-top: 5px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #eee; }
            .job-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 25px; }
            a { color: #4a9eff; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h2>New Job Application Received!</h2></div>
            <div class="content">

              <div class="job-info">
                <h3>${safeJobTitle}</h3>
                <p><strong>Department:</strong> ${safeJobDepartment} | <strong>Location:</strong> ${safeJobLocation}</p>
              </div>

              <div class="section"><div class="label">Name:</div><div class="value">${safeFullName}</div></div>
              <div class="section"><div class="label">Email:</div><div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div></div>
              <div class="section"><div class="label">Phone:</div><div class="value">${safePhone}</div></div>
              ${safeLinkedin ? `<div class="section"><div class="label">LinkedIn:</div><div class="value"><a href="${safeLinkedin}" target="_blank">${safeLinkedin}</a></div></div>` : ''}
              <div class="section"><div class="label">Experience:</div><div class="value">${safeExperience}</div></div>
              <div class="section"><div class="label">Preferred Location:</div><div class="value">${safePreferredLocation}</div></div>

              ${safeCoverLetter ? `
              <div class="section">
                <div class="label">Cover Letter:</div>
                <div class="value">${safeCoverLetter}</div>
              </div>` : ''}

              <div style="margin-top: 30px; padding: 15px; background: #fff; border-left: 4px solid #4a9eff; font-style: italic;">
                A resume has been attached below as a PDF.
              </div>

            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: resumeName,
          content: buffer,
          contentType: 'application/pdf',
        },
      ],
    }

    await transporter.sendMail(mailOptions)

    res.json({
      message: "Application submitted successfully! We'll contact you soon.",
    })
  } catch (error) {
    console.error('Application submission error:', error)
    res.status(500).json({
      message: 'Failed to submit application. Please try again later.',
    })
  }
})

export default router
