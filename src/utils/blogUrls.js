export const isDevToBlogId = (value) => /^\d+$/.test(String(value || ''))

export const getBlogPostUrl = (post) =>
  post.isCustom ? `/blog/${post.slug}` : `/blog/${post.id}`
