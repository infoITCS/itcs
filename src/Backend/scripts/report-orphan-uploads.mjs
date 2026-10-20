/**
 * Reports which files in src/Backend/uploads are actually referenced by the
 * database, so unreferenced ones can be deleted safely.
 *
 *   node scripts/report-orphan-uploads.mjs
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config()

const UPLOAD_DIR = path.join(__dirname, '../uploads')
const conn = await mongoose.connect(process.env.MONGO_URI)
const db = conn.connection.client.db('ITCSwebsite')

const referenced = new Map()
const walk = (value, where) => {
  if (typeof value === 'string') {
    const re = /\/uploads\/([A-Za-z0-9._-]+)/g
    let m
    while ((m = re.exec(value))) {
      if (!referenced.has(m[1])) referenced.set(m[1], new Set())
      referenced.get(m[1]).add(where)
    }
  } else if (Array.isArray(value)) value.forEach(walk)
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, where)
}

let docsScanned = 0
for (const { name } of await db.listCollections().toArray()) {
  const docs = await db.collection(name).find({}).toArray()
  docsScanned += docs.length
  docs.forEach((d) => walk(d, name))
}
console.log(`scanned ${docsScanned} docs across all collections`)

const files = fs.readdirSync(UPLOAD_DIR)
let orphanBytes = 0
let keptBytes = 0
const orphans = []
const used = []

for (const f of files) {
  const full = path.join(UPLOAD_DIR, f)
  if (!fs.statSync(full).isFile()) continue
  const size = fs.statSync(full).size
  if (referenced.has(f)) {
    keptBytes += size
    used.push({ f, size, refs: [...referenced.get(f)] })
  } else {
    orphanBytes += size
    orphans.push({ f, size })
  }
}

const digest = fs.readFileSync(path.join(UPLOAD_DIR, files[0] || 'x'))
const hashes = new Map()
for (const f of files) {
  const full = path.join(UPLOAD_DIR, f)
  if (!fs.statSync(full).isFile()) continue
  const h = crypto.createHash('md5').update(fs.readFileSync(full)).digest('hex')
  if (!hashes.has(h)) hashes.set(h, [])
  hashes.get(h).push(f)
}

console.log(`\nON DISK : ${files.length} files, ${((keptBytes + orphanBytes) / 1024 / 1024).toFixed(1)} MB`)
console.log(`IN USE  : ${used.length} files, ${(keptBytes / 1024 / 1024).toFixed(1)} MB`)
console.log(`ORPHAN  : ${orphans.length} files, ${(orphanBytes / 1024 / 1024).toFixed(1)} MB`)
console.log(`\nduplicate content groups:`)
for (const [h, group] of hashes) {
  if (group.length > 1) console.log(`  ${group.length}x ${h.slice(0, 10)}  ${group.slice(0, 4).join(', ')}${group.length > 4 ? ' ...' : ''}`)
}
console.log(`\nORPHAN LIST:`)
for (const o of orphans.sort((a, b) => b.size - a.size)) console.log(`  ${(o.size / 1024).toFixed(0).padStart(7)} KB  ${o.f}`)

fs.writeFileSync(path.join(__dirname, '../.backup/upload-orphans.json'), JSON.stringify(orphans, null, 2))
await conn.disconnect()
