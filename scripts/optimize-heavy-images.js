import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const assetsDir = path.join(root, 'src', 'assets')

/** Aggressive settings for decorative / low-opacity backgrounds */
const HEAVY_TARGETS = [
  { file: 'images/homepage-bg.webp', maxWidth: 1600, quality: 55 },
  { file: 'images/contactUs-bg.webp', maxWidth: 1600, quality: 55 },
  { file: 'images/SignupBG.webp', maxWidth: 1400, quality: 60 },
  { file: 'images/CyberSecurity-images/cyberSection3-img.webp', maxWidth: 1200, quality: 65 },
  { file: 'images/IT-Services-images/it-services-section1-bg.webp', maxWidth: 1600, quality: 55 },
  { file: 'images/CyberSecurity-images/cyberSecurity-Section1-bg.webp', maxWidth: 1600, quality: 55 },
  { file: 'images/Enterprise-images/Enterprise-section1-bg.webp', maxWidth: 1600, quality: 55 },
  { file: 'images/CyberSecurity-images/cyber-section6-bg.webp', maxWidth: 1400, quality: 55 },
  { file: 'images/Network-solutions/network-section1-bg.webp', maxWidth: 1600, quality: 55 },
]

const compressOne = async ({ file, maxWidth, quality }) => {
  const inputPath = path.join(assetsDir, file)
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip missing: ${file}`)
    return
  }

  const before = fs.statSync(inputPath).size
  const tmpPath = `${inputPath}.tmp.webp`

  const image = sharp(inputPath, { failOn: 'none' })
  const meta = await image.metadata()
  const width = meta.width && meta.width > maxWidth ? maxWidth : meta.width

  await image
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(tmpPath)

  const after = fs.statSync(tmpPath).size
  if (after < before) {
    try {
      fs.unlinkSync(inputPath)
    } catch {
      // File may be locked by Vite; overwrite via copy
    }
    try {
      fs.copyFileSync(tmpPath, inputPath)
      fs.unlinkSync(tmpPath)
    } catch (err) {
      // Keep .tmp.webp so we can replace manually if needed
      console.warn(`Wrote ${path.basename(tmpPath)} (could not replace original): ${err.message}`)
      return
    }
    console.log(
      `OK  ${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
    )
  } else {
    fs.unlinkSync(tmpPath)
    console.log(`SKIP ${file}: already smaller/equal (${(before / 1024).toFixed(0)}KB)`)
  }
}

const main = async () => {
  for (const target of HEAVY_TARGETS) {
    await compressOne(target)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
