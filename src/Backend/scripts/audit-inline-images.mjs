/**
 * Audit + backup pass. Read-only against the database, but it writes a full
 * JSON dump of every collection that holds inline (base64 data-URI) images so
 * the migration in the next step can be reverted.
 *
 *   node scripts/audit-inline-images.mjs
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config()

const BACKUP_DIR = path.join(__dirname, '../.backup')
const DATA_URI = /data:image\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)/g

const conn = await mongoose.connect(process.env.MONGO_URI)
const db = conn.connection.client.db('ITCSwebsite')

const walk = (value, pathStr, hits) => {
  if (typeof value === 'string') {
    DATA_URI.lastIndex = 0
    let m
    while ((m = DATA_URI.exec(value))) {
      hits.push({ field: pathStr, mime: m[1], base64Len: m[2].length, approxBytes: Math.round((m[2].length * 3) / 4) })
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${pathStr}[${i}]`, hits))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walk(v, pathStr ? `${pathStr}.${k}` : k, hits)
  }
}

const report = {}
let grandTotal = 0

for (const { name } of await db.listCollections().toArray()) {
  const docs = await db.collection(name).find({}).toArray()
  const hits = []
  docs.forEach((d, i) => walk(d, '', hits))
  const bytes = hits.reduce((a, h) => a + h.approxBytes, 0)
  if (hits.length === 0) continue

  const byField = {}
  for (const h of hits) {
    byField[h.field] = byField[h.field] || { count: 0, approxBytes: 0 }
    byField[h.field].count++
    byField[h.field].approxBytes += h.approxBytes
  }

  report[name] = { docCount: docs.length, inlineImages: hits.length, approxBytes: bytes, byField }
  grandTotal += bytes

  console.log(`\n${name}: ${docs.length} docs, ${hits.length} inline images, ~${(bytes / 1024 / 1024).toFixed(2)} MB`)
  for (const [f, v] of Object.entries(byField).sort((a, b) => b[1].approxBytes - a[1].approxBytes)) {
    console.log(`   ${String(v.count).padStart(4)}x  ${(v.approxBytes / 1024).toFixed(0).padStart(7)} KB  ${f}`)
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const file = path.join(BACKUP_DIR, `${name}-${stamp}.json`)
  fs.writeFileSync(file, JSON.stringify(docs, null, 0))
  console.log(`   backup -> ${path.relative(process.cwd(), file)} (${(fs.statSync(file).size / 1024 / 1024).toFixed(2)} MB)`)
}

console.log(`\nTOTAL inline image data: ~${(grandTotal / 1024 / 1024).toFixed(2)} MB`)
fs.writeFileSync(path.join(BACKUP_DIR, 'audit-summary.json'), JSON.stringify(report, null, 2))
await conn.disconnect()
