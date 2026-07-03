import path from 'path'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MAX_PDF_BYTES = 5 * 1024 * 1024

export const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const isValidEmail = (email) =>
  typeof email === 'string' && email.length <= 254 && EMAIL_REGEX.test(email.trim())

export const sanitizeEmailHeader = (value) => {
  if (typeof value !== 'string') return ''
  return value.replace(/[\r\n]/g, '').trim().slice(0, 200)
}

export const trimString = (value, maxLen = 5000) => {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLen)
}

export const sanitizeFilename = (name) => {
  const base = path.basename(String(name || 'resume.pdf'))
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
  return cleaned.toLowerCase().endsWith('.pdf') ? cleaned : `${cleaned}.pdf`
}

export const parsePdfFromBase64 = (resume) => {
  if (typeof resume !== 'string' || !resume.trim()) {
    throw new Error('Resume (PDF) is required.')
  }

  let base64Data
  const matches = resume.match(/^data:([^;]+);base64,(.+)$/s)

  if (matches) {
    if (!matches[1].toLowerCase().includes('pdf')) {
      throw new Error('Only PDF files are allowed.')
    }
    base64Data = matches[2]
  } else {
    base64Data = resume
  }

  const buffer = Buffer.from(base64Data, 'base64')

  if (!buffer.length) {
    throw new Error('Resume file is empty.')
  }

  if (buffer.length > MAX_PDF_BYTES) {
    throw new Error('Resume must be 5MB or smaller.')
  }

  if (buffer.subarray(0, 4).toString() !== '%PDF') {
    throw new Error('Only valid PDF files are allowed.')
  }

  return buffer
}

export const assertJwtSecretStrength = () => {
  const secret = process.env.JWT_SECRET || ''
  const weakDefaults = new Set(['supersecretkey', 'secret', 'your-jwt-secret', 'changeme'])

  if (!secret || secret.length < 32 || weakDefaults.has(secret)) {
    console.warn(
      '⚠️  JWT_SECRET is missing or weak. Set a long random value in .env for production.',
    )
  }
}
