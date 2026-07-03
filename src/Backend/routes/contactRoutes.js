import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { rateLimit } from '../middleware/rateLimit.js'
import {
  escapeHtml,
  isValidEmail,
  sanitizeEmailHeader,
  trimString,
} from '../utils/validation.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config({ path: path.join(__dirname, '../.env') })
const router = express.Router()

const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL_TO || 'info@itcs.com.pk'
const CONTACT_SMTP_USER = process.env.CONTACT_SMTP_USER || process.env.EMAIL_USER
const CONTACT_SMTP_PASS = process.env.CONTACT_SMTP_PASS || process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
  host: process.env.CONTACT_SMTP_HOST || process.env.EMAIL_HOST || 'smtp.office365.com',
  port: parseInt(process.env.CONTACT_SMTP_PORT || process.env.EMAIL_PORT || '587', 10),
  secure: false,
  auth: {
    user: CONTACT_SMTP_USER,
    pass: CONTACT_SMTP_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2',
  },
})

const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyPrefix: 'contact',
})

router.post('/', contactRateLimit, async (req, res) => {
  try {
    const name = trimString(req.body.name, 120)
    const email = trimString(req.body.email, 254)
    const phone = trimString(req.body.phone || '', 40)
    const subject = trimString(req.body.subject, 200)
    const message = trimString(req.body.message, 10000)

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All required fields must be filled.' })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    if (!CONTACT_SMTP_USER || !CONTACT_SMTP_PASS) {
      console.error('Contact form: CONTACT_SMTP_USER or CONTACT_SMTP_PASS not configured')
      return res.status(500).json({ message: 'Email service is not configured. Please try again later.' })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone || 'N/A')
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    const mailOptions = {
      from: `"ITCS Website Contact" <${CONTACT_SMTP_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: sanitizeEmailHeader(email),
      subject: sanitizeEmailHeader(`New Contact Request: ${subject} - ${name}`),
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
            a { color: #4a9eff; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h2>New Contact Form Submission</h2></div>
            <div class="content">
              <div class="section"><div class="label">Name:</div><div class="value">${safeName}</div></div>
              <div class="section"><div class="label">Email:</div><div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div></div>
              <div class="section"><div class="label">Phone:</div><div class="value">${safePhone}</div></div>
              <div class="section"><div class="label">Subject:</div><div class="value">${safeSubject}</div></div>
              <div class="section">
                <div class="label">Message:</div>
                <div class="value">${safeMessage}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.json({ message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Contact form submission error:', error)
    res.status(500).json({ message: 'Failed to send message. Please try again later.' })
  }
})

export default router
