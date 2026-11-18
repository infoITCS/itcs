import { toUrlSlug } from './slugify'

export const getBlogPostUrl = (post) =>
  post?.slug ? `/${String(post.slug).replace(/^\/+/, '')}` : '/blog'

export const getCustomBlogPath = (slug) => `/${slug}`

export const getTagUrl = (tag) => `/tag/${toUrlSlug(tag)}`

export const getAuthorUrl = (author) => `/author/${toUrlSlug(author)}`

export const getJobUrl = (job) => {
  const slug = job?.slug || toUrlSlug(job?.title)
  return slug ? `/careers/${slug}` : '/careers'
}

export { toUrlSlug }
