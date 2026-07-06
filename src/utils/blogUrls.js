export const isDevToBlogId = (value) => /^\d+$/.test(String(value || ''))

export const getBlogPostUrl = (post) =>
  post.isCustom ? `/${post.slug}` : `/blog/${post.id}`

export const getCustomBlogPath = (slug) => `/${slug}`
