import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceExts = ['jsx', 'js', 'scss', 'css']
const refs = []

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist'].includes(entry.name)) walk(fullPath)
      continue
    }

    if (!sourceExts.some((ext) => entry.name.endsWith(`.${ext}`))) continue

    const content = fs.readFileSync(fullPath, 'utf8')
    const fileDir = path.dirname(fullPath)

    for (const match of content.matchAll(/from\s+['"]([^'"]+\.webp)['"]/g)) {
      refs.push({ from: fullPath, ref: match[1] })
    }

    for (const match of content.matchAll(/url\((['"]?)([^'")]+?\.webp)\1\)/g)) {
      refs.push({ from: fullPath, ref: match[2] })
    }
  }
}

walk(path.join(root, 'src'))

const missing = []
const resolved = []

for (const { from, ref } of refs) {
  let target

  if (ref.startsWith('assets/')) {
    target = path.join(root, 'src', ref)
  } else {
    target = path.resolve(path.dirname(from), ref)
  }

  resolved.push({ from: path.relative(root, from), ref, target: path.relative(root, target) })

  if (!fs.existsSync(target)) {
    missing.push({ from: path.relative(root, from), ref, target: path.relative(root, target) })
  }
}

console.log(`Checked ${resolved.length} WebP references`)

if (missing.length) {
  console.log('\nMISSING FILES:')
  for (const item of missing) {
    console.log(`- ${item.ref}`)
    console.log(`  referenced in: ${item.from}`)
    console.log(`  expected at: ${item.target}`)
  }
  process.exit(1)
}

console.log('All referenced WebP files exist.')

const assetsDir = path.join(root, 'src', 'assets')
const leftover = []
const walkAssets = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walkAssets(fullPath)
    else if (/\.(png|jpe?g|gif)$/i.test(entry.name)) leftover.push(path.relative(root, fullPath))
  }
}
walkAssets(assetsDir)

if (leftover.length) {
  console.log('\nLeftover non-WebP files in src/assets:')
  leftover.forEach((f) => console.log(`- ${f}`))
  process.exit(1)
}

console.log('No leftover PNG/JPG/GIF files in src/assets.')
