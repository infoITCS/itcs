const buckets = new Map()

const pruneExpired = (now) => {
  if (buckets.size < 10000) return
  for (const [key, bucket] of buckets.entries()) {
    if (now > bucket.reset) buckets.delete(key)
  }
}

export const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 5, keyPrefix = 'default' } = {}) => {
  return (req, res, next) => {
    const now = Date.now()
    pruneExpired(now)

    const ip = req.ip || req.socket?.remoteAddress || 'unknown'
    const key = `${keyPrefix}:${ip}`
    let bucket = buckets.get(key)

    if (!bucket || now > bucket.reset) {
      bucket = { count: 0, reset: now + windowMs }
      buckets.set(key, bucket)
    }

    bucket.count += 1

    if (bucket.count > max) {
      return res.status(429).json({
        message: 'Too many requests. Please try again later.',
      })
    }

    next()
  }
}
