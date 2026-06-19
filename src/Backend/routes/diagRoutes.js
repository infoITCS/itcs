import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config({ path: path.join(__dirname, '../.env') })

const router = express.Router()

router.get('/diag-email', async (req, res) => {
  const result = {
    emailUser: process.env.EMAIL_USER ? 'SET: ' + process.env.EMAIL_USER : 'NOT SET',
    emailPass: process.env.EMAIL_PASS ? 'SET (' + process.env.EMAIL_PASS.length + ' chars)' : 'NOT SET',
    envFileExists: false,
    envFileContent: null,
    error: null,
  }

  const envPath = path.join(__dirname, '../../.env')
  try {
    if (fs.existsSync(envPath)) {
      result.envFileExists = true
      const content = fs.readFileSync(envPath, 'utf8')
      result.envFileContent = content.replace(/EMAIL_PASS=.*/g, 'EMAIL_PASS=***HIDDEN***')
    }
  } catch (e) {
    result.envFileReadError = e.message
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          reject(error)
        } else {
          resolve(success)
        }
      })
    })

    result.verifySuccess = true
  } catch (error) {
    result.error = {
      message: error.message,
      code: error.code,
      command: error.command,
    }
  }

  res.json(result)
})

export default router
