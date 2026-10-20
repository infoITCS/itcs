import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const assetsDir = path.join(rootDir, 'src', 'assets')

const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const SOURCE_GLOBS = ['jsx', 'js', 'scss', 'css', 'html']

const walkFiles = (dir, matcher, results = []) => {
  if (!fs.existsSync(dir)) return results

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(fullPath, matcher, results)
    } else if (matcher(fullPath)) {
      results.push(fullPath)
    }
  }

  return results
}

const convertImage = async (inputPath) => {
  const ext = path.extname(inputPath).toLowerCase()
  if (!SOURCE_EXTENSIONS.has(ext)) return null

  const outputPath = inputPath.slice(0, -ext.length) + '.webp'
  const image = sharp(inputPath, { failOn: 'none' })
  const metadata = await image.metadata()

  if (metadata.hasAlpha) {
    await image.webp({ quality: 90, alphaQuality: 90, effort: 4 }).toFile(outputPath)
  } else {
    await image.webp({ quality: 85, effort: 4 }).toFile(outputPath)
  }

  return { from: inputPath, to: outputPath }
}

const removeOriginal = (inputPath) => {
  try {
    fs.unlinkSync(inputPath)
  } catch (error) {
    if (error.code === 'EBUSY' || error.code === 'EPERM') {
      console.warn(`Could not delete ${path.relative(rootDir, inputPath)} (file in use). Delete manually later.`)
      return
    }
    throw error
  }
}

const updateReferences = (replacements) => {
  const sourceFiles = [
    path.join(rootDir, 'index.html'),
    ...walkFiles(path.join(rootDir, 'src'), (filePath) =>
      SOURCE_GLOBS.some((ext) => filePath.endsWith(`.${ext}`)),
    ),
  ]

  const sorted = [...replacements].sort((a, b) => b.from.length - a.from.length)

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, 'utf8')
    let changed = false

    for (const { from, to } of sorted) {
      const fromBasename = path.basename(from)
      const toBasename = path.basename(to)

      if (content.includes(fromBasename)) {
        const next = content.replaceAll(fromBasename, toBasename)
        if (next !== content) {
          content = next
          changed = true
        }
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`Updated references in ${path.relative(rootDir, filePath)}`)
    }
  }
}

const main = async () => {
  const images = walkFiles(assetsDir, (filePath) =>
    SOURCE_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  )

  if (!images.length) {
    console.log('No PNG/JPG/JPEG images found in src/assets.')
    return
  }

  console.log(`Converting ${images.length} images to WebP...`)
  const replacements = []

  for (const imagePath of images) {
    const ext = path.extname(imagePath).toLowerCase()
    const webpPath = imagePath.slice(0, -ext.length) + '.webp'
    if (fs.existsSync(webpPath) && !fs.existsSync(imagePath)) {
      replacements.push({ from: imagePath, to: webpPath })
      continue
    }

    const result = await convertImage(imagePath)
    if (result) {
      removeOriginal(result.from)
      replacements.push(result)
      console.log(`Converted ${path.relative(rootDir, result.from)} -> ${path.basename(result.to)}`)
    }
  }

  updateReferences(replacements)
  console.log(`Done. Converted ${replacements.length} images.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
