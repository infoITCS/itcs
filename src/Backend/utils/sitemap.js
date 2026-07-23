import { findAllJobs, findBlogPublishedSummaries } from '../models/dbHelpers.js'
import { toUrlSlug } from './slugify.js'

/** Public, canonical routes from src/App.jsx (no auth/admin/redirect URLs). */
export const STATIC_SITEMAP_PATHS = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/cloud', changefreq: 'weekly', priority: '0.9' },
  { path: '/cloud/design', changefreq: 'monthly', priority: '0.8' },
  { path: '/cloud/migration', changefreq: 'monthly', priority: '0.8' },
  { path: '/cloud/security', changefreq: 'monthly', priority: '0.8' },
  { path: '/cybersecurity', changefreq: 'weekly', priority: '0.9' },
  { path: '/cybersecurity/assessment', changefreq: 'monthly', priority: '0.8' },
  { path: '/consulting', changefreq: 'monthly', priority: '0.8' },
  { path: '/enterprise-solutions', changefreq: 'monthly', priority: '0.8' },
  { path: '/it-services', changefreq: 'monthly', priority: '0.8' },
  { path: '/network-solutions', changefreq: 'monthly', priority: '0.8' },
  { path: '/network-solutions/design', changefreq: 'monthly', priority: '0.7' },
  { path: '/network-solutions/security', changefreq: 'monthly', priority: '0.7' },
  { path: '/network-solutions/support', changefreq: 'monthly', priority: '0.7' },
  { path: '/web-development', changefreq: 'monthly', priority: '0.8' },
  { path: '/microsoft', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/ai-workforce', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/ai-business-process', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/security', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/cloud-ai-platforms', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/surface', changefreq: 'weekly', priority: '0.9' },
  { path: '/mission-vision', changefreq: 'monthly', priority: '0.7' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/careers', changefreq: 'weekly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
]

const xmlEscape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const getSiteOrigin = () => 'https://itcs.com.pk'

const toDateOnly = (value) => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10)
}

const buildUrlEntry = ({ loc, lastmod, changefreq, priority }) => {
  const lines = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`]
  if (lastmod) lines.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`)
  if (changefreq) lines.push(`    <changefreq>${xmlEscape(changefreq)}</changefreq>`)
  if (priority) lines.push(`    <priority>${xmlEscape(priority)}</priority>`)
  lines.push(`  </url>`)
  return lines.join('\n')
}

/**
 * Builds a full sitemap XML string including static pages + published blog slugs.
 * Blog canonical URLs are /:slug (see src/utils/blogUrls.js).
 */
export const buildSitemapXml = async (origin) => {
  const base = String(origin || 'https://itcs.com.pk').replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)

  let dynamicEntries = []
  try {
    const publishedBlogs = await findBlogPublishedSummaries()
    dynamicEntries.push(
      ...publishedBlogs
        .filter((b) => b?.slug)
        .map((b) => ({
          path: `/${String(b.slug).replace(/^\/+/, '')}`,
          lastmod: toDateOnly(b.updatedAt || b.publishDate || b.createdAt),
          changefreq: 'monthly',
          priority: '0.7',
        })),
    )
  } catch (error) {
    // Still return static pages if DB is unavailable
    console.error('Sitemap blog fetch failed:', error.message)
  }

  try {
    const jobs = await findAllJobs()
    dynamicEntries.push(
      ...jobs
        .map((job) => job?.slug || toUrlSlug(job?.title))
        .filter(Boolean)
        .map((slug) => ({
          path: `/careers/${String(slug).replace(/^\/+/, '')}`,
          changefreq: 'weekly',
          priority: '0.6',
        })),
    )
  } catch (error) {
    console.error('Sitemap job fetch failed:', error.message)
  }

  const uniqueEntries = new Map()
  ;[...STATIC_SITEMAP_PATHS, ...dynamicEntries].forEach((entry) => {
    if (!entry?.path) return
    uniqueEntries.set(entry.path, entry)
  })

  const urls = Array.from(uniqueEntries.values())
    .map((entry) => buildUrlEntry({
      loc: `${base}${entry.path}`,
      lastmod: entry.lastmod || today,
      changefreq: entry.changefreq,
      priority: entry.priority,
    }))
    .join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  )
}
