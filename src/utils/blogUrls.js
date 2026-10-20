import { toUrlSlug } from './slugify'

export const isDevToBlogId = (value) => /^\d+$/.test(String(value || ''))

export const getBlogPostUrl = (post) =>
  post.isCustom ? `/${post.slug}` : `/blog/${post.id}`

export const getCustomBlogPath = (slug) => `/${slug}`

export const getTagUrl = (tag) => `/tag/${toUrlSlug(tag)}`

export const getAuthorUrl = (author) => `/author/${toUrlSlug(author)}`

export const getJobUrl = (job) => {
  const slug = job?.slug || toUrlSlug(job?.title)
  return slug ? `/careers/${slug}` : '/careers'
}

export { toUrlSlug }
