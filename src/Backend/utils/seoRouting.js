import {
  findBlogOneBySlug,
  findBlogPublishedSummaries,
  findJobById,
  findJobBySlug,
} from '../models/dbHelpers.js'
import { toUrlSlug } from './slugify.js'
import { STATIC_SITEMAP_PATHS } from './sitemap.js'

export const NOINDEX_HEADER = 'noindex, nofollow'

/** Legacy /blog/:id URLs belonged to the retired dev.to feed. */
const LEGACY_BLOG_PATH = /^\/blog\/[^/]+$/i

const staticPaths = new Set(STATIC_SITEMAP_PATHS.map(({ path }) => path))

const clientRedirectPaths = new Set([
  '/home',
  '/services/cloud',
  '/services/cloud/design',
  '/services/cloud/migration',
  '/services/cloud/security',
  '/services/cybersecurity',
  '/services/cybersecurity/assessment',
  '/services/cyber-security',
  '/services/cyber-security/assessment',
  '/cyber-security',
  '/cyber-security/assessment',
  '/services/consulting',
  '/services/enterprise-solutions',
  '/services/it-services',
  '/services/network-solutions',
  '/services/network-solutions/design',
  '/services/network-solutions/security',
  '/services/network-solutions/support',
  '/services/web-development',
  '/services/ai',
  '/vision-mission',
  '/about',
  '/contact-us',
  '/index.html',
])

const utilityPaths = new Set([
  '/apply',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
])

/** Paths removed permanently: return 410 Gone instead of a Soft 404. */
export const getGonePaths = () => new Set(
  String(process.env.GONE_PATHS || '')
    .split(',')
    .map((p) => p.trim().replace(/\/+$/, ''))
    .filter(Boolean),
)

/** Direct media/attachment URLs must never be treated as indexable pages. */
export const isMediaPath = (pathname) => {
  const p = String(pathname || '').toLowerCase()
  return (
    p.startsWith('/uploads/') ||
    p.startsWith('/media/') ||
    p.startsWith('/attachments/') ||
    p.startsWith('/wp-content/')
  )
}

/** A path that looks like a file (missing image/js/css/pdf) is never a page. */
export const hasFileExtension = (pathname) =>
  /\.[a-z0-9]{2,8}$/i.test(String(pathname || '').split(/[?#]/)[0])

/**
 * Single source of truth for HTTP status codes on frontend routes.
 * Used by the Plesk/Passenger server and the Vercel serverless handler so a
 * missing blog, tag, job or unknown URL returns a real 404 (not a 200 SPA shell).
 */
export const isKnownFrontendPath = async (pathname) => {
  const normalizedPath = String(pathname || '').split(/[?#]/)[0].replace(/\/+$/, '') || '/'

  if (
    staticPaths.has(normalizedPath) ||
    clientRedirectPaths.has(normalizedPath) ||
    utilityPaths.has(normalizedPath) ||
    /^\/reset-password\/[^/]+$/.test(normalizedPath) ||
    normalizedPath === '/admin' ||
    normalizedPath.startsWith('/admin/')
  ) {
    return true
  }

  if (isMediaPath(normalizedPath) || hasFileExtension(normalizedPath)) {
    return false
  }

  if (normalizedPath.startsWith('/tag/') || normalizedPath.startsWith('/author/')) {
    const [, routeType, routeSlug, extraPath] = normalizedPath.split('/')
    if (!routeSlug || extraPath) return false

    const blogs = await findBlogPublishedSummaries()
    return blogs.some((blog) => {
      if (routeType === 'tag') {
        return (blog.tags || []).some((tag) => toUrlSlug(tag) === routeSlug)
      }
      return blog.author && toUrlSlug(blog.author) === routeSlug
    })
  }

  const jobMatch = normalizedPath.match(/^\/careers\/([^/]+)$/)
  if (jobMatch) {
    const [, jobId] = jobMatch
    const job = await findJobBySlug(jobId) ||
      (/^[a-f\d]{24}$/i.test(jobId) ? await findJobById(jobId) : null)
    return Boolean(job && job.isActive !== false)
  }

  const blogMatch = normalizedPath.match(/^\/([a-z0-9-]+)$/i)
  if (blogMatch) {
    const blog = await findBlogOneBySlug(blogMatch[1])
    return blog?.status === 'published'
  }

  return false
}

/** Resolve the correct status for a frontend URL: 200, 404 or 410 Gone. */
export const getFrontendStatus = async (pathname) => {
  const normalizedPath = String(pathname || '').split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  if (getGonePaths().has(normalizedPath) || LEGACY_BLOG_PATH.test(normalizedPath)) return 410
  return (await isKnownFrontendPath(normalizedPath)) ? 200 : 404
}
