export const estimateReadingMinutes = (text = '') => {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/**
 * Quill / Word paste often stores every space as &nbsp;, which prevents
 * line wrapping and forces the browser to split words mid-character.
 * Convert those to normal spaces so published posts wrap at word boundaries.
 */
export const normalizeBlogHtml = (html = '') => {
  if (!html) return ''
  return String(html)
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
}

export const formatPublishedBlog = (blog) => {
  let description = blog.excerpt || blog.metaDescription || ''
  let title = blog.title || ''

  title = title.replace(/([?!:])([a-zA-Z])/g, '$1 $2')
  description = description.replace(/([?!:])([a-zA-Z])/g, '$1 $2')

  return {
    id: blog._id,
    title,
    description,
    metaTitle: blog.metaTitle,
    metaDescription: blog.metaDescription || description,
    cover_image: blog.featuredImage,
    social_image: blog.ogImage,
    user: { username: blog.author, name: blog.author },
    published_at: blog.publishDate,
    readable_publish_date: new Date(blog.publishDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    reading_time_minutes: estimateReadingMinutes(description),
    tag_list: blog.tags || [],
    displayAuthor: blog.author,
    displayDate: blog.publishDate,
    isCustom: true,
    slug: blog.slug,
    updatedAt: blog.updatedAt,
  }
}

export const sortBlogsByDate = (blogs) =>
  [...blogs].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.published_at)
    const dateB = new Date(b.updatedAt || b.published_at)
    return dateB - dateA
  })
