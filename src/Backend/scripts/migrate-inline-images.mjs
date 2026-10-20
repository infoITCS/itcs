/**
 * Moves every inline base64 data-URI image out of MongoDB and into
 * src/Backend/uploads, rewriting the stored strings to point at the new file.
 *
 * Why: the `content` field of blog posts holds 335 inline images (~50 MB in
 * total). Browsers cannot cache a data-URI, cannot lazy-load it, and every
 * view re-downloads the whole embedded blob inside a JSON response.
 *
 * Identical images are written once (content-hashed filename), so this also
 * de-duplicates the copy-pasted uploads that already exist on disk.
 *
 *   node scripts/migrate-inline-images.mjs --dry-run   # report only
 *   node scripts/migrate-inline-images.mjs             # apply
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config()

const DRY_RUN = process.argv.includes('--dry-run')
const UPLOAD_DIR = path.join(__dirname, '../uploads')
const MAX_WIDTH = 1400
const QUALITY = 82

let sharp = null
try {
  const mod = await import(pathToFileURL(path.join(__dirname, '../../../node_modules/sharp/dist/index.mjs')).href)
  sharp = mod.default
} catch (e) {
  console.log('! sharp not available (' + e.message + ') - storing original bytes without re-encoding')
}
if (sharp) console.log('sharp ready, re-encoding to webp q' + QUALITY + ' max width ' + MAX_WIDTH)

const DATA_URI = /data:image\/([a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)/g
const MIME_EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'image/avif': 'avif' }

const written = new Map()
let bytesBefore = 0
let bytesAfter = 0
let replaced = 0

async function storeImage(mime, base64) {
  const raw = Buffer.from(base64, 'base64')
  bytesBefore += raw.length

  const hash = crypto.createHash('sha1').update(raw).digest('hex').slice(0, 12)
  const existing = [...written.entries()].find(([, h]) => h === hash)
  if (existing) {
    bytesAfter += existing.size
    return existing.name
  }

  const ext = MIME_EXT[mime.toLowerCase()] || 'png'
  const name = `inline-${hash}.${ext}`
  const dest = path.join(UPLOAD_DIR, name)

  let out = raw
  if (sharp && mime.toLowerCase() !== 'image/gif' && mime.toLowerCase() !== 'image/svg+xml') {
    try {
      out = await sharp(raw)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer()
      written.set(name, { size: out.length, hash, ext: 'webp' })
      bytesAfter += out.length
      if (!DRY_RUN && !fs.existsSync(dest.replace(/\.\w+$/, '.webp'))) {
        fs.writeFileSync(path.join(UPLOAD_DIR, `inline-${hash}.webp`), out)
      }
      return `inline-${hash}.webp`
    } catch {
      /* fall through to original bytes */
    }
  }

  written.set(name, { size: raw.length, hash, ext })
  bytesAfter += raw.length
  if (!DRY_RUN) fs.writeFileSync(dest, raw)
  return name
}

async function rewriteString(str) {
  if (typeof str !== 'string' || !str.includes('data:image/')) return null
  const names = new Map()
  DATA_URI.lastIndex = 0
  let m
  while ((m = DATA_URI.exec(str))) {
    const key = m[0]
    if (!names.has(key)) names.set(key, await storeImage(m[1], m[2]))
  }
  if (!names.size) return null
  let out = str
  for (const [uri, name] of names) out = out.split(uri).join(`/uploads/${name}`)
  return out
}

function collectTargets(value, pathStr, acc) {
  if (typeof value === 'string') {
    if (value.includes('data:image/')) acc.push({ path: pathStr, value })
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectTargets(v, `${pathStr}[${i}]`, acc))
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectTargets(v, pathStr ? `${pathStr}.${k}` : k, acc)
  }
}

const conn = await mongoose.connect(process.env.MONGO_URI)
const db = conn.connection.client.db('ITCSwebsite')
const coll = db.collection('customblogs')

if (!DRY_RUN) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const docs = await coll.find({}).toArray()
console.log(`scanning ${docs.length} customblogs...`)
if (DRY_RUN) console.log('(DRY RUN - nothing will be written)')

let touched = 0
for (const doc of docs) {
  const targets = []
  collectTargets(doc, '', targets)
  if (!targets.length) continue

  const set = {}
  for (const t of targets) {
    const rewritten = await rewriteString(t.value)
    if (rewritten !== null) {
      set[t.path] = rewritten
      replaced++
    }
  }
  if (Object.keys(set).length) {
    touched++
    if (DRY_RUN) {
      console.log(`  would update ${doc.slug} (${Object.keys(set).join(', ')})`)
    } else {
      await coll.updateOne({ _id: doc._id }, { $set: set })
    }
  }
}

console.log(`\ndocs touched        : ${touched}`)
console.log(`fields rewritten    : ${replaced}`)
console.log(`images written      : ${written.size}`)
console.log(`image bytes before  : ${(bytesBefore / 1024 / 1024).toFixed(2)} MB`)
console.log(`image bytes after   : ${(bytesAfter / 1024 / 1024).toFixed(2)} MB`)
if (bytesBefore) {
  console.log(`reduction           : ${(100 - (bytesAfter / bytesBefore) * 100).toFixed(1)}%`)
}

await conn.disconnect()
