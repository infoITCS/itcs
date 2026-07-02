import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config({ path: path.join(__dirname, '../.env') })
const router = express.Router()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.office365.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // false for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All required fields must be filled.' })
    }

    const mailOptions = {
      from: `"ITCS Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'info@itcs.com.pk',
      replyTo: email,
      subject: `New Contact Request: ${subject} - ${name}`,
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
              <div class="section"><div class="label">Name:</div><div class="value">${name}</div></div>
              <div class="section"><div class="label">Email:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
              <div class="section"><div class="label">Phone:</div><div class="value">${phone || 'N/A'}</div></div>
              <div class="section"><div class="label">Subject:</div><div class="value">${subject}</div></div>
              <div class="section">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\\n/g, '<br>')}</div>
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
