import express from 'express'
import mongoose from 'mongoose'
import * as db from '../models/dbHelpers.js'
import {
  canManageBlog,
  requireAdmin,
  requireAuthorOrAdmin,
} from '../middleware/auth.js'

const ObjectId = mongoose.Types.ObjectId
const router = express.Router()

const MAX_BLOG_BYTES = 15 * 1024 * 1024

const estimatePayloadBytes = (obj) => {
  try {
    return Buffer.byteLength(JSON.stringify(obj), 'utf8')
  } catch {
    return MAX_BLOG_BYTES + 1
  }
}

const resolveUniqueSlug = async (slug, excludeId = null) => {
  if (!slug) return slug

  let candidate = slug
  let counter = 1

  while (true) {
    const existing = await db.findBlogOneBySlug(candidate)
    if (!existing || (excludeId && String(existing._id) === String(excludeId))) {
      return candidate
    }
    candidate = `${slug}-${counter}`
    counter += 1
  }
}

router.post('/', requireAuthorOrAdmin, async (req, res) => {
  try {
    let {
      title,
      slug,
      content,
      author,
      excerpt,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body

    const ownerId = String(req.user._id)
    author = author || req.user.fullName || req.user.email

    if (slug) {
      slug = await resolveUniqueSlug(slug)
    }

    const blogPayload = {
      title,
      slug,
      content,
      author,
      excerpt,
      tags: Array.isArray(tags) ? tags : [],
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      status: 'pending',
      ownerId,
      publishDate: new Date(),
    }

    if (estimatePayloadBytes(blogPayload) > MAX_BLOG_BYTES) {
      return res.status(413).json({
        message: 'Blog is too large. Please use a smaller image or reduce content length.',
      })
    }

    const saved = await db.createBlog(blogPayload)
    res.status(201).json({ message: 'Blog submitted for approval!', data: saved })
  } catch (error) {
    console.error('Save error:', error)
    res.status(500).json({ message: 'Failed to save blog', error: error.message })
  }
})

router.put('/:id', requireAuthorOrAdmin, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const existing = await db.findBlogById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Blog not found' })

    if (!canManageBlog(req.user, existing)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const {
      title,
      slug,
      content,
      author,
      excerpt,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
    } = req.body

    let resolvedSlug = slug
    if (resolvedSlug && resolvedSlug !== existing.slug) {
      resolvedSlug = await resolveUniqueSlug(resolvedSlug, existing._id)
    }

    const updateData = {
      title,
      slug: resolvedSlug,
      content,
      author,
      excerpt,
      tags: Array.isArray(tags) ? tags : [],
      metaTitle,
      metaDescription,
      metaKeywords,
    }

    if (featuredImage !== undefined) {
      updateData.featuredImage = featuredImage
    }

    if (status && (req.user.isAdmin || req.user.role === 'admin')) {
      updateData.status = status
    }

    if (estimatePayloadBytes({ ...existing, ...updateData }) > MAX_BLOG_BYTES) {
      return res.status(413).json({
        message: 'Blog is too large. Please use a smaller image or reduce content length.',
      })
    }

    const updated = await db.updateBlogById(req.params.id, updateData)

    if (!updated) return res.status(404).json({ error: 'Blog not found' })

    res.json({ message: 'Blog updated successfully!', data: updated })
  } catch (error) {
    console.error('Update error:', error)
    const isTooLarge = /too large|BSON|size/i.test(error.message || '')
    res.status(isTooLarge ? 413 : 500).json({
      message: isTooLarge
        ? 'Blog is too large. Please use a smaller image or reduce content length.'
        : 'Failed to update blog',
      error: error.message,
    })
  }
})

router.get('/summaries', requireAuthorOrAdmin, async (req, res) => {
  try {
    const query = { status: { $ne: 'rejected' } }

    if (req.user.role === 'author' && !req.user.isAdmin) {
      query.ownerId = String(req.user._id)
    }

    const blogs = await db.findBlogSummaries(query)
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching blogs', error: error.message })
  }
})

router.get('/list', requireAuthorOrAdmin, async (req, res) => {
  try {
    let query = {}

    if (req.user.role === 'author' && !req.user.isAdmin) {
      query = { ownerId: String(req.user._id) }
    }

    const blogs = await db.findBlogListItems(query)
    res.set('Cache-Control', 'private, max-age=15')
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching blogs', error: error.message })
  }
})

router.get('/approval-list', requireAdmin, async (req, res) => {
  try {
    const query = { status: { $ne: 'rejected' } }
    const blogs = await db.findBlogListItems(query)
    res.set('Cache-Control', 'private, max-age=15')
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching blogs', error: error.message })
  }
})

router.get('/all', requireAuthorOrAdmin, async (req, res) => {
  try {
    let query = {}

    if (req.user.role === 'author' && !req.user.isAdmin) {
      query = { ownerId: String(req.user._id) }
    }

    const blogs = await db.findBlogWhere(query)
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching blogs', error: error.message })
  }
})

router.get('/published', async (req, res) => {
  try {
    const blogs = await db.findBlogPublishedSummaries()
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching blogs', error: error.message })
  }
})

router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await db.findBlogOneBySlug(req.params.slug)
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.post('/covers', requireAuthorOrAdmin, async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ error: 'ids array required' })
    }

    const limitedIds = ids.filter((id) => ObjectId.isValid(id)).slice(0, 50)
    const covers = await db.findBlogCoversByIds(limitedIds)
    const isAuthorOnly = req.user.role === 'author' && !req.user.isAdmin

    const result = {}
    for (const blog of covers) {
      if (isAuthorOnly && blog.ownerId !== String(req.user._id)) continue
      result[String(blog._id)] = blog.featuredImage || null
    }

    res.set('Cache-Control', 'private, max-age=3600')
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching covers', error: error.message })
  }
})

router.get('/:id/cover', requireAuthorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const blog = await db.findBlogCoverById(id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    if (req.user.role === 'author' && !req.user.isAdmin && blog.ownerId !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    res.set('Cache-Control', 'private, max-age=3600')
    res.json({ featuredImage: blog.featuredImage || null })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/:id/edit', requireAuthorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const blog = await db.findBlogForEdit(id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    if (!canManageBlog(req.user, blog)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const coverMeta = await db.findBlogCoverById(id)
    res.json({
      ...blog,
      hasCover: !!(coverMeta?.featuredImage),
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/:id', requireAuthorOrAdmin, async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const blog = await db.findBlogById(id)
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    if (!canManageBlog(req.user, blog)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.delete('/:id', requireAuthorOrAdmin, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const existing = await db.findBlogById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Blog not found' })

    if (!canManageBlog(req.user, existing)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const deleted = await db.deleteBlogById(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Blog not found' })
    res.json({ message: 'Blog deleted successfully' })
  } catch (err) {
    console.error('Delete error:', err)
    res.status(500).json({ error: 'Failed to delete blog' })
  }
})

router.get('/statuses', requireAuthorOrAdmin, async (req, res) => {
  try {
    const statuses = await db.findBlogStatuses()
    res.json(statuses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch statuses' })
  }
})

router.get('/approved-ids', async (req, res) => {
  try {
    const approvedBlogs = await db.findApprovedIds()
    res.json(approvedBlogs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch approved IDs' })
  }
})

router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status, customAuthor, customDate } = req.body
    const idParam = req.params.id

    const numId = Number(idParam)
    if (!Number.isNaN(numId)) {
      const updateFields = {}
      if (status !== undefined) {
        if (!['approved', 'rejected'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status' })
        }
        updateFields.status = status
      }
      if (customAuthor !== undefined) updateFields.customAuthor = customAuthor
      if (customDate !== undefined) updateFields.customDate = customDate

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' })
      }

      const updated = await db.upsertBlogStatus(numId, updateFields)
      return res.json(updated)
    }

    if (!ObjectId.isValid(idParam)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const allowedStatuses = ['pending', 'published', 'rejected']
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const updated = await db.updateBlogById(idParam, { status })

    if (!updated) return res.status(404).json({ error: 'Blog not found' })
    res.json(updated)
  } catch (err) {
    console.error('Update error:', err)
    res.status(500).json({ error: 'Failed to update record' })
  }
})

export default router
