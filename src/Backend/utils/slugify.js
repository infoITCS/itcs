export const toUrlSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const isMongoObjectId = (value) => /^[a-f0-9]{24}$/i.test(String(value || ''))
